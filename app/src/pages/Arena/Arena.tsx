import React, { useEffect, useRef, useState } from "react";
import { Warrior } from "../../../../types/warrior";
import GoToHome from "../../components/App/GoToHome";
import WarriorPicker from "../../components/Arena/WarriorPicker";

import "./Arena.css";
import WarriorFightCard from "../../components/Arena/WarriorFightCard";
import { Link } from "react-router-dom";

enum AttackResult {
  dodge,
  dpDamage,
  dpDestroyed,
  hpDamage,
}

enum FightEffects{
  NONE = "",
  DODGE = 'dodge',
  WIN = 'win',
}

enum FightStages {
  NOT_STARTED,
  IN_FIGHT,
  FINISHED,
}

interface FightLog {
  attackerName: string;
  defenderName: string;
  defenderHp: number;
  defenderDp: number;
  attackResult: AttackResult;
}

interface FightResult {
  fightLogs: FightLog[];
  winner: Warrior;
  looser: Warrior;
}

function Arena(){
  const initialWarrior: Warrior = {name: "", strength: 0, defense: 0, agility: 0, resilience: 0, wonBattles: 0, attackImagePath: "", portraitImagePath: "", hp: 0, dp: 0};

  const [warriors, setWarriors] = useState<Warrior[]>([]);
  const [firstWarrior, setFirstWarrior] = useState<Warrior>(initialWarrior);
  const [secondWarrior, setSecondWarrior] = useState<Warrior>(initialWarrior);
  const [fightResult, setFightResult] = useState<FightResult>({fightLogs: [], winner: initialWarrior, looser: initialWarrior});
  const [fightStage, setFightStage] = useState(FightStages.NOT_STARTED);
  const [shouldSkipFight, setShouldSkipFight] = useState(false);
  const [fightIntervalId, setFightIntervalId] = useState<NodeJS.Timer>();

  const arenaScreen = useRef<HTMLDivElement>(null);
  const fightScreen = useRef<HTMLDivElement>(null);
  const firstWarriorAttack = useRef<HTMLImageElement>(null);
  const secondWarriorAttack = useRef<HTMLImageElement>(null);
  const [firstWarriorEffect, setFirstWarriorEffect] = useState<FightEffects>(FightEffects.NONE);
  const [secondWarriorEffect, setSecondWarriorEffect] = useState<FightEffects>(FightEffects.NONE);

  useEffect(() => {
    const fetchWarriors = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/warrior`);
      const fetchedWarriors = await response.json();

      setWarriors(fetchedWarriors);
      setFirstWarrior(fetchedWarriors[0]);
      setSecondWarrior(fetchedWarriors[1]);
    }

    fetchWarriors();
  }, []);

  const pickFirstWarrior = (warrior: Warrior) => {
      if(warrior.name !== secondWarrior.name) setFirstWarrior(warrior);
    }

  const pickSecondWarrior = (warrior: Warrior) => {
      if(warrior.name !== firstWarrior.name) setSecondWarrior(warrior);
    }

  const startFight = async () => {
    arenaScreen.current?.classList.add('shadow-screen');

    const fightWarriors = {
      firstWarriorName: firstWarrior.name, 
      secondWarriorName: secondWarrior.name
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/arena`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fightWarriors),
    });
    const result = await response.json();

    setTimeout(() =>{
      arenaScreen.current?.classList.add('hide');
      fightScreen.current?.classList.remove('hide');
      fightScreen.current?.classList.add('unshadow-screen');
      setTimeout(() => {
        fightScreen.current?.classList.remove('unshadow-screen');
        setFightResult(result);
        setFightStage(FightStages.IN_FIGHT);
      }, 3000);
    }, 3000);
  }

  const animateAttack = (log: FightLog, attackRef: React.RefObject<HTMLDivElement>, setEffect: React.Dispatch<React.SetStateAction<FightEffects>>) => {    
    attackRef.current?.classList.add('animate');
    if (log.attackResult === AttackResult.dodge) setEffect(FightEffects.DODGE);

    setTimeout(() => {
      attackRef.current?.classList.remove('animate');
      setEffect(FightEffects.NONE);
    }, 1600);

  }

  //TODO: Laurel on WIN and Additional FightEffects
  const skipFight = () => {
    setShouldSkipFight(true);
  }

  useEffect(() => {
    const {fightLogs} = fightResult;

    if(fightStage === FightStages.IN_FIGHT){
      let logNumber = 0;
      const interval = setInterval(() => {
        const log = fightResult.fightLogs[logNumber];

        if(log.attackerName === firstWarrior.name){
          animateAttack(log, firstWarriorAttack, setSecondWarriorEffect);
          setSecondWarrior({...secondWarrior, dp: log.defenderDp, hp: log.defenderHp});
        } else {
          animateAttack(log, secondWarriorAttack, setFirstWarriorEffect);
          setFirstWarrior({...firstWarrior, dp: log.defenderDp, hp: log.defenderHp});
        }

        logNumber++;
      }, 2000);

      setFightIntervalId(interval);

      setTimeout(() => {
        clearInterval(interval);
        setFightStage(FightStages.FINISHED);
      }, fightResult.fightLogs.length * 2000);
    }

    if(shouldSkipFight){
      if(fightResult.winner.name === firstWarrior.name){
        setFirstWarrior({...firstWarrior, hp: fightLogs[fightLogs.length - 2].defenderHp, dp: fightLogs[fightLogs.length - 2].defenderDp});
        setSecondWarrior({...secondWarrior, hp: fightLogs[fightLogs.length - 1].defenderHp, dp: fightLogs[fightLogs.length - 1].defenderDp});
      } else {
        setFirstWarrior({...firstWarrior, hp: fightLogs[fightLogs.length - 1].defenderHp, dp: fightLogs[fightLogs.length - 1].defenderDp});
        setSecondWarrior({...secondWarrior, hp: fightLogs[fightLogs.length - 2].defenderHp, dp: fightLogs[fightLogs.length - 2].defenderDp});
      }

      if(fightIntervalId !== undefined) clearInterval(fightIntervalId);
      setFightStage(FightStages.FINISHED);
    }

    return () => fightIntervalId !== undefined ? clearInterval(fightIntervalId) : undefined;
  }, [fightStage, shouldSkipFight]);

  return (
    <article className="arena">
      <article className="warriors-pick-screen" ref={arenaScreen}>
      <div className="container">
        <h1>Arena</h1>
        <section className="fight-settings">
          <WarriorPicker pickerLabel="1st warrior" pickedWarrior={firstWarrior} blockedWarrior={secondWarrior} warriors={warriors} pickWarrior={pickFirstWarrior}/>
          <span>VS</span>
          <WarriorPicker pickerLabel="2nd warrior" pickedWarrior={secondWarrior} blockedWarrior={firstWarrior} warriors={warriors} pickWarrior={pickSecondWarrior}/>
        </section>
        <button className="fight" onClick={startFight}>FIGHT</button>
      </div>
      </article>
      <article className="fight-screen hide" ref={fightScreen}>
        <div className="container">
          <h1>Fight</h1>
          <section className="fight-board">
            <WarriorFightCard warrior={firstWarrior} effect={firstWarriorEffect}/>
            <div className="attacks">
              <img className="first-warrior-attack" src={`${process.env.REACT_APP_API_URL}/${firstWarrior.attackImagePath}`} alt="attack" ref={firstWarriorAttack}/>
              <img className="second-warrior-attack"  src={`${process.env.REACT_APP_API_URL}/${secondWarrior.attackImagePath}`} alt="attack" ref={secondWarriorAttack}/>
            </div>
            <WarriorFightCard warrior={secondWarrior} effect={secondWarriorEffect}/>
          </section>
          {fightStage === FightStages.IN_FIGHT && <button className="skip-fight" onClick={skipFight}>(SKIP)</button>}
        </div>
        {fightStage === FightStages.FINISHED && 
        <div className="fight-finished-panel">
          <h1 className="winner">Winner: {fightResult.winner.name}</h1>
          <Link to="/arena" onClick={() => window.location.reload()}>Go back to arena</Link>
        </div>}
      </article>
      <GoToHome />
    </article>
  )
}

export default Arena;
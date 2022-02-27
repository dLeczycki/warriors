import React, { useEffect, useRef, useState } from "react";
import { Warrior } from "../../../../types/warrior";
import { FightResult, FightStages,FightEffects, AttackResult, FightLog } from "../../types/fightLog";
import GoToHome from "../../components/App/GoToHome";

import "./Arena.css";
import FightFinishedPanel from "../../components/Arena/FightFinishedPanel";
import FightBoard from "../../components/Arena/FightBoard";
import SkipFightButton from "../../components/Arena/SkipFightButton";
import StartFightButton from "../../components/Arena/StartFightButton";
import FightSettings from "../../components/Arena/FightSettings";


function Arena(){
  const initialWarrior: Warrior = {name: "", strength: 0, defense: 0, agility: 0, resilience: 0, wonBattles: 0, attackImagePath: "bandit-attack-image.png", portraitImagePath: "bandit-portrait-image.png", hp: 0, dp: 0};

  const [warriors, setWarriors] = useState<Warrior[]>([]);
  const [firstWarrior, setFirstWarrior] = useState<Warrior>(initialWarrior);
  const [secondWarrior, setSecondWarrior] = useState<Warrior>(initialWarrior);
  const [fightResult, setFightResult] = useState<FightResult>({fightLogs: [], winner: initialWarrior, looser: initialWarrior});
  const [firstWarriorEffect, setFirstWarriorEffect] = useState<FightEffects>(FightEffects.NONE);
  const [secondWarriorEffect, setSecondWarriorEffect] = useState<FightEffects>(FightEffects.NONE);
  const [fightStage, setFightStage] = useState(FightStages.NOT_STARTED);
  const [shouldSkipFight, setShouldSkipFight] = useState(false);
  const [fightIntervalId, setFightIntervalId] = useState<NodeJS.Timer>();

  const arenaScreen = useRef<HTMLDivElement>(null);
  const fightScreen = useRef<HTMLDivElement>(null);
  const firstWarriorAttack = useRef<HTMLImageElement>(null);
  const secondWarriorAttack = useRef<HTMLImageElement>(null);

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

  const skipFight = () => {
    setShouldSkipFight(true);
  }
  
  const getWarriorAfterDefense = (warrior: Warrior, log: FightLog): Warrior => {
    return {...warrior, hp: log.defenderHp, dp: log.defenderDp};
  }

  useEffect(() => {
    const {fightLogs} = fightResult;

    if(fightStage === FightStages.IN_FIGHT){
      let logNumber = 0;
      const interval = setInterval(() => {
        const log = fightResult.fightLogs[logNumber];

        if(log.attackerName === firstWarrior.name){
          animateAttack(log, firstWarriorAttack, setSecondWarriorEffect);
          setSecondWarrior(getWarriorAfterDefense(secondWarrior, log));
        } else {
          animateAttack(log, secondWarriorAttack, setFirstWarriorEffect);
          setFirstWarrior(getWarriorAfterDefense(firstWarrior, log));
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
      const winnerLastLog = fightLogs[fightLogs.length - 2];
      const looserLastLog = fightLogs[fightLogs.length - 1];

      if(fightResult.winner.name === firstWarrior.name){
        setFirstWarrior(getWarriorAfterDefense(firstWarrior, winnerLastLog));
        setSecondWarrior(getWarriorAfterDefense(secondWarrior, looserLastLog));
      } else {
        setFirstWarrior(getWarriorAfterDefense(firstWarrior, looserLastLog));
        setSecondWarrior(getWarriorAfterDefense(secondWarrior, winnerLastLog));
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
        <FightSettings 
          firstWarrior={firstWarrior} 
          pickFirstWarrior={pickFirstWarrior} 
          secondWarrior={secondWarrior} 
          pickSecondWarrior={pickSecondWarrior} 
          warriors={warriors} />
        <StartFightButton startFight={startFight} />
      </div>
      </article>
      <article className="fight-screen hide" ref={fightScreen}>
        <div className="container">
          <h1>Fight</h1>
          <FightBoard 
            firstWarrior={firstWarrior} 
            firstWarriorEffect={firstWarriorEffect} 
            firstWarriorAttack={firstWarriorAttack}  
            secondWarrior={secondWarrior} 
            secondWarriorEffect={secondWarriorEffect} 
            secondWarriorAttack={secondWarriorAttack}
          />
          {fightStage === FightStages.IN_FIGHT && <SkipFightButton skipFight={skipFight}/>}
        </div>
        {fightStage === FightStages.FINISHED && <FightFinishedPanel winnerName={fightResult.winner.name} />}
      </article>
      <GoToHome />
    </article>
  )
}

export default Arena;
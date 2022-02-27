import React from 'react';
import { FightEffects } from '../../types/fightLog';
import { Warrior } from '../../types/warrior';
import WarriorFightCard from './WarriorFightCard';

interface FightBoardProps{
  firstWarrior: Warrior;
  firstWarriorEffect: FightEffects;
  firstWarriorAttack: React.RefObject<HTMLImageElement>;
  secondWarrior: Warrior;
  secondWarriorEffect: FightEffects;
  secondWarriorAttack: React.RefObject<HTMLImageElement>;
}

function FightBoard({firstWarrior, firstWarriorEffect, secondWarrior, secondWarriorEffect, firstWarriorAttack, secondWarriorAttack}: FightBoardProps){

  return (
    <section className="fight-board">
      <WarriorFightCard warrior={firstWarrior} effect={firstWarriorEffect}/>
      <div className="attacks">
        <img className="first-warrior-attack" src={`${process.env.REACT_APP_API_URL}/${firstWarrior.attackImagePath}`} alt="attack" ref={firstWarriorAttack}/>
        <img className="second-warrior-attack"  src={`${process.env.REACT_APP_API_URL}/${secondWarrior.attackImagePath}`} alt="attack" ref={secondWarriorAttack}/>
      </div>
      <WarriorFightCard warrior={secondWarrior} effect={secondWarriorEffect}/>
  </section>
  )
}

export default FightBoard;
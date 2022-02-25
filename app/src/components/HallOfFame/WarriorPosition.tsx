import React from 'react';
import { Warrior } from '../../../../types/warrior';

interface WarriorPositionProps{
  warrior: Warrior;
  position: number;
}

function WarriorPosition({warrior, position}: WarriorPositionProps){
  let medal="";
  let suffix="th";
  switch(position){
    case 1: 
      medal="gold";
      suffix="st";
      break;
    case 2:
      medal="silver";
      suffix="nd";
      break;
    case 3:
      medal="bronze";
      suffix="rd";
      break;
    default: 
      medal="";
      suffix="th";
      break;
  }

  return (
    <li className={`position ${medal}`}>
      <div className="info-block">
        <span>{`${position}${suffix}`}</span>
        <img src={`${process.env.REACT_APP_API_URL}/${warrior.portraitImagePath}`} alt="" />
      </div>
      <span>{warrior.name}</span>
      <span>{warrior.wonBattles}</span>
    </li>
  )
}

export default WarriorPosition;
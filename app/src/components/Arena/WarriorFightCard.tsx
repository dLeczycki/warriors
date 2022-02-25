import React, { useEffect, useState } from 'react';
import { Warrior } from '../../../../types/warrior';

enum FightEffects{
  NONE = "",
  DODGE = 'dodge',
  WIN = 'win',
}

interface WarriorFightCardProps{ 
  warrior: Warrior;
  effect: FightEffects;
}

function WarriorFightCard({warrior, effect}:WarriorFightCardProps){
  const [hpWidth, setHpWidth] = useState({right: '0'});
  const [dpWidth, setDpWidth] = useState({right: '0'});

  const warriorMaxHp = warrior.resilience * 10;
  const warriorMaxDp = warrior.defense;

  const calculateBarWidth = (value: number, maxValue: number): {right: string} => {
    const percent = 100 - (value/maxValue) * 100;
    return {right: `${percent > 0 ? percent : 0}%`};
  }

  useEffect(() => {
    setHpWidth(calculateBarWidth(warrior.hp, warriorMaxHp));
  }, [warrior.hp])

  useEffect(() => {
    setDpWidth(calculateBarWidth(warrior.dp, warriorMaxDp));
  }, [warrior.dp])

  return (
    <div className="warrior-fight-card">
      <div className={`portrait-image ${effect === FightEffects.DODGE ? effect : null}`} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/${warrior?.portraitImagePath})`}}></div>
      <h3>{warrior.name}</h3>
      <div className="bar dp-bar">
        <span>{warrior.dp}/{warriorMaxDp}</span>
        <div className="progress" style={dpWidth}></div>
        </div>
      <div className="bar hp-bar">
        <span>{warrior.hp}/{warriorMaxHp}</span>
        <div className="progress" style={hpWidth}></div>
        </div>
    </div>
  )
}

export default WarriorFightCard;
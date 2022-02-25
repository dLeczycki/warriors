import React from "react";
import { Warrior } from "../../../../types/warrior";

interface WarriorToPickProps{ 
  warrior: Warrior;
  state: string;
  pickFunction: (warrior: Warrior) => void;
}

function WarriorToPick({warrior, state, pickFunction}: WarriorToPickProps) {

  return (
    <img className={`warrior-to-pick ${state}`} src={`${process.env.REACT_APP_API_URL}/${warrior.portraitImagePath}`} alt={warrior.name} onClick={() => pickFunction(warrior)}/>
  )
}

export default WarriorToPick;
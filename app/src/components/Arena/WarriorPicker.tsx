import React from "react";
import { Warrior } from "../../../../types/warrior";
import WarriorToPick from "./WarriorToPick";

interface WarriorPickerProps{
  pickerLabel:string;
  pickedWarrior: Warrior;
  blockedWarrior: Warrior;
  warriors: Warrior[];
  pickWarrior: (warrior: Warrior) => void;
}

enum WarriorPickState{
  PICKED = 'picked',
  BLOCKED = 'blocked',
  TO_PICK = 'to-pick',
}

function WarriorPicker({pickerLabel, pickedWarrior, blockedWarrior, warriors, pickWarrior}: WarriorPickerProps){

  const warriorsToPick = warriors.map((warrior) => {
    let state;
    switch(warrior.name){
      case pickedWarrior.name:
        state = WarriorPickState.PICKED;
        break;
      case blockedWarrior.name:
        state = WarriorPickState.BLOCKED;
        break;
      default:
        state = WarriorPickState.TO_PICK
        break;
    }
    return (<WarriorToPick key={warrior.name} warrior={warrior} state={state} pickFunction={pickWarrior}/>);
  });

  return (
    <section className="warrior-picker">
      <h2>{pickerLabel}</h2>
      <div className="chosen-warrior">
        <img src={`${process.env.REACT_APP_API_URL}/${pickedWarrior.portraitImagePath}`} alt="" />
        <h3>{pickedWarrior.name}</h3>
        <hr />
        <div className="statistics">
          <p>Strength: <span>{pickedWarrior.strength}</span></p>
          <p>Defense: <span>{pickedWarrior.defense}</span></p>
          <p>Agility: <span>{pickedWarrior.agility}</span></p>
          <p>Resilience: <span>{pickedWarrior.resilience}</span></p>
        </div>
      </div>
      <div className="warriors">
      <h3>Choose warrior</h3>
        {warriorsToPick}
      </div>
    </section>
  )
}

export default WarriorPicker;
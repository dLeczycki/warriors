import React from 'react';
import { Warrior } from '../../types/warrior';
import WarriorPicker from './WarriorPicker';

interface FightSettingsProps{
  firstWarrior: Warrior;
  pickFirstWarrior: (warrior: Warrior) => void;
  secondWarrior: Warrior;
  pickSecondWarrior: (warrior: Warrior) => void;
  warriors: Warrior[];
}

function FightSettings({firstWarrior, pickFirstWarrior, secondWarrior, pickSecondWarrior, warriors}: FightSettingsProps){

  return (
    <section className="fight-settings">
      <WarriorPicker pickerLabel="1st warrior" pickedWarrior={firstWarrior} blockedWarrior={secondWarrior} warriors={warriors} pickWarrior={pickFirstWarrior}/>
      <span>VS</span>
      <WarriorPicker pickerLabel="2nd warrior" pickedWarrior={secondWarrior} blockedWarrior={firstWarrior} warriors={warriors} pickWarrior={pickSecondWarrior}/>
  </section>
  )
}

export default FightSettings;
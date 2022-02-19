import React, { SyntheticEvent } from "react";

interface StatInputProps{
  label: string;
  name: string;
  stat: number;
  setStat: React.Dispatch<React.SetStateAction<number>>;
  remainingPoints: number;
  setRemainingPoints: React.Dispatch<React.SetStateAction<number>>;
};

function StatInput({label, name, stat, setStat, remainingPoints, setRemainingPoints}: StatInputProps){

  const handleOnChange = (e: SyntheticEvent) => {
    e.preventDefault();
  }

  const incrementStat = (e: SyntheticEvent) => {
    e.preventDefault();
    if(remainingPoints > 0){
      setStat(prev => prev + 1);
      setRemainingPoints(prev => prev - 1);
    }
  }

  const decrementStat = (e: SyntheticEvent) => {
    e.preventDefault();
    if(stat > 1){
      setStat(prev => prev - 1);
      setRemainingPoints(prev => prev + 1);
    }
  }

  return (
    <label className="stat" htmlFor={name} >
      {label}:
      <div className="stat-input">
        <input type="number" name={name} id={name} value={stat} onChange={handleOnChange}/>
        <div className="buttons">
          <button className="increment-stat" onClick={incrementStat}>+</button>
          <button className="decrement-stat" onClick={decrementStat}>-</button>
        </div>
      </div>
    </label>
  )
}

export default StatInput;
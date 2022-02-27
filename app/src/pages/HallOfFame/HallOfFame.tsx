import React, { useEffect, useState } from "react";
import { Warrior } from "../../../../types/warrior";
import GoToHome from "../../components/App/GoToHome";
import WarriorPosition from "../../components/HallOfFame/WarriorPosition";

import './HallOfFame.css';

function HallOfFame(){
  const [bestWarriors, setBestWarriors] = useState<Warrior[]>([]);

  useEffect(() => {
    const fetchBestWarriors = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/hall-of-fame`);
      const data = await response.json();

      setBestWarriors(data);
    }

    fetchBestWarriors();
  }, []);

  const warriorsTable = bestWarriors.map((warrior, index) => <WarriorPosition key={index} warrior={warrior} position={index+1}/>)

  return (
    <article className="hall-of-fame">
      <div className="container">
        <h1>Hall Of Fame</h1>
        <small>(Place - Warrior - Won Battles)</small>
        <ul>
          {warriorsTable}
        </ul>
      </div>
      <GoToHome />
    </article>
  )
}

export default HallOfFame;
import React from "react";
import GoToHome from "../../components/App/GoToHome";

import './HallOfFame.css';

function HallOfFame(){

  return (
    <article className="hall-of-fame">
      <div className="container">
        <h1>Hall Of Fame</h1>
        <GoToHome />
      </div>
    </article>
  )
}

export default HallOfFame;
import React from "react";
import GoToHome from "../../components/GoToHome/GoToHome";

import './HallOfFame.css';

function HallOfFame(){

  return (
    <section className="hall-of-fame">
      <div className="container">
        <h1>HallOfFame</h1>
        <GoToHome />
      </div>
    </section>
  )
}

export default HallOfFame;
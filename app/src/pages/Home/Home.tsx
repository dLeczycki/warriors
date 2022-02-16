import React from "react";
import {Link } from "react-router-dom";

import './Home.css';

function Home(){

  return (
    <section className="home">
      <div className="container">
        <h1>MegaK Warriors</h1>
        <ul>
          <li><Link to="/arena">arena</Link></li>
          <li><Link to="/create-warrior">create warrior</Link></li>
          <li><Link to="/hall-of-fame">hall of fame</Link></li>
        </ul>
      </div>
      <address>Created by Daniel Łęczycki</address>
    </section>
  )
}

export default Home;
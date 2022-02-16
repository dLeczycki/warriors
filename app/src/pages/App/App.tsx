import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from '../Home/Home';
import Arena from '../Arena/Arena';
import CreateWarrior from '../CreateWarrior/CreateWarrior';
import HallOfFame from '../HallOfFame/HallOfFame';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/arena" element = {<Arena/>}/>
        <Route path="/create-warrior" element = {<CreateWarrior/>}/>
        <Route path="/hall-of-fame" element = {<HallOfFame/>}/>
      </Routes>
    </div>
  );
}

export default App;

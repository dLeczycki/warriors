import * as React from 'react';
import { Link } from 'react-router-dom';

interface FightFinishedPanelProps{
  winnerName: string;
}

function FightFinishedPanel({winnerName}: FightFinishedPanelProps){

  return (
    <div className="fight-finished-panel">
          <h1 className="winner">Winner: {winnerName}</h1>
          <Link to="/arena" onClick={() => window.location.reload()}>Go back to arena</Link>
    </div>
  )
}

export default FightFinishedPanel;
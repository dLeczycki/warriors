import React from 'react';

interface StartFightButtonProps{
  startFight: () => Promise<void>;
}

function StartFightButton({startFight}: StartFightButtonProps){

  return (
    <button className="fight" onClick={startFight}>FIGHT</button>
  )
}

export default StartFightButton;
import * as React from 'react';

interface SkipFightButtonProps{
  skipFight: () => void;
}

function SkipFightButton({skipFight}: SkipFightButtonProps){
  return (<button className="skip-fight" onClick={skipFight}>(SKIP)</button>)
}

export default SkipFightButton;
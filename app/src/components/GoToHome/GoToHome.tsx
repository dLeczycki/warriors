import {Link} from 'react-router-dom';

import './GoToHome.css';

function GoToHome(){
  return (
      <Link to="/" className="home-link">home</Link>
  )
}

export default GoToHome;
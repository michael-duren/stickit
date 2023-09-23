import './SideNav.css';
import { Link } from 'react-router-dom';
import Routes from '../Routes/Routes';

function SideNav() {
  return (
    <div className="side-nav-container">
      <ul className="side-nav-list">
        <Link to={Routes.Home}>
          <li>Home</li>
        </Link>
        <Link to={Routes.MyActivity}>
          <li>My Activity</li>
        </Link>
        <Link to={Routes.Exercises}>
          <li>Exercises</li>
        </Link>
        <Link to={Routes.Routines}>
          <li>Routines</li>
        </Link>
        <Link to={Routes.Goals}>
          <li>Goals</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;

import './SideNav.css';
import { Link } from 'react-router-dom';
import Routes from '../Routes/Routes';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function SideNav() {
  const path = useLocation().pathname;
  console.log(path);
  return (
    <div className="side-nav-container">
      <ul className="side-nav-list">
        <Link
          className={`${path === Routes.Home ? 'current-path' : ''}`}
          to={Routes.Home}
        >
          <li>Home</li>
        </Link>
        <Link
          className={`${path === Routes.MyActivity ? 'current-path' : ''}`}
          to={Routes.MyActivity}
        >
          <li>My Activity</li>
        </Link>
        <Link
          to={Routes.Exercises}
          className={`${path === Routes.Exercises ? 'current-path' : ''}`}
        >
          <li>Exercises</li>
        </Link>
        <Link
          to={Routes.Routines}
          className={`${path === Routes.Routines ? 'current-path' : ''}`}
        >
          <li>Routines</li>
        </Link>
        <Link
          to={Routes.Goals}
          className={`${path === Routes.Goals ? 'current-path' : ''}`}
        >
          <li>Goals</li>
        </Link>
      </ul>
    </div>
  );
}

export default SideNav;

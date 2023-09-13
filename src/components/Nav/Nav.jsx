// import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import logoImg from "../../images/Logo.svg";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

function Nav() {
  const user = useSelector((store) => store.user);
  const { pathname } = useLocation();
  // you can check a more conditions here
  if (pathname === "/login" || pathname === "/registration") return null;


  return (
    <div className="nav">
      <Link to="/home">
        <div className='display-flex'>
          <img className='logo-img' src={logoImg} alt="" />
          <h1 className="nav-title">StickIt</h1>
        </div>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {/* {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="navLink p-r-xl" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

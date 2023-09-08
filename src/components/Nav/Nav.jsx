// import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import logoImg from "../../images/Logo.svg";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();
  console.log(pathname);
  // you can check a more conditions here
  if (pathname === "/login") return null;
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <div className='display-flex'>
          <img src={logoImg} alt="" />
          <h2 className="nav-title">StickIt</h2>
        </div>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;

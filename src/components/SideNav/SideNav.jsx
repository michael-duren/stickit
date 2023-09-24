import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./SideNav.css";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Routes from '../Routes/Routes';
import { Link } from 'react-router-dom';
function SideNav() {
  return (
    <div className="side-nav-container">
      <ul className="side-nav-list">
        <Link to={Routes.Home}><li classname="nav-link">Home</li></Link>
        <Link to={Routes.MyActivity}><li classname="nav-link">My Activity</li></Link>
        <Link to={Routes.Exercises}><li classname="nav-link">Exercises</li></Link>
        <Link to={Routes.Routines}><li classname="nav-link">Routines</li></Link>
        <Link to={Routes.Goals}><li classname="nav-link">Goals</li></Link>
      </ul>
    </div >

  )
}

export default SideNav;
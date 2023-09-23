import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./SideNav.css";
import Routes from '../Routes/Routes'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import HomePage from '../HomePage/HomePage';

function SideNav() {
  return (
    <div className="side-nav-container">
      <ul className="side-nav-list">
        <li>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Home}
          >
            <HomePage />
          </ProtectedRoute>
          Home</li>
        <li>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.MyActivity}
          >
            <MyActivity />
          </ProtectedRoute>
          My Activity</li>
        <li>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Exercises}
          >
            <Exercises />
          </ProtectedRoute>
          Exercises</li>
        <li>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Routines}
          >
            <Routines />
          </ProtectedRoute>
          Routines</li>
        <li>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path={Routes.Goals}
          >
            <Goals />
          </ProtectedRoute>
          Goals</li>
      </ul>
    </div>

  )
}

export default SideNav;
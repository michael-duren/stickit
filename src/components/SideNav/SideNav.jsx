import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./SideNav.css";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Routes from '../Routes/Routes';

function SideNav() {
  return (
    <div className="side-nav-container">
      <ul className="side-nav-list">
        <li>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Home}
          >
            <link>
              <HomePage />
            </link>
          </ProtectedRoute>

          Home</li>
        <li>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.MyActivity}
          >
            <link>
              <MyActivityPage />
            </link>
          </ProtectedRoute>
          My Activity</li>
        <li>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Exercises}
          >
            <link>
              <ExercisesPage />
            </link>
          </ProtectedRoute>
          Exercises</li>
        <li>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Routines}
          >
            <link>
              <RoutinesPage />
            </link>
          </ProtectedRoute>
          Routines</li>
        <li>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Goals}
          >
            <link>
              <GoalsPage />
            </link>

          </ProtectedRoute>
          Goals</li>
      </ul>
    </div >

  )
}

export default SideNav;
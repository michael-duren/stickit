import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./SideNav.css";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Routes from '../Routes/Routes';

function SideNav() {
    return(
        <div className="side-nav-container">
        <ul className="side-nav-list">
            <li>
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Home}
          >
            <HomePage />
          </ProtectedRoute>
              Home</li>
            <li>
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.MyActivity}
          >
            <MyActivityPage />
          </ProtectedRoute>
              My Activity</li>
            <li>
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Exercises}
          >
            <ExercisesPage />
          </ProtectedRoute>
              Exercises</li>
            <li>
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Routines}
          >
            <RoutinesPage />
          </ProtectedRoute>
              Routines</li>
            <li>
            <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path={Routes.Goals}
          >
            <GoalsPage />
          </ProtectedRoute>
              Goals</li>
        </ul>
        </div>

    )
}

export default SideNav;
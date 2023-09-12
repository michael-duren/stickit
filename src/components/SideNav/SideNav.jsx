import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./SideNav.css";

function SideNav() {
    return(
        <div className="side-nav-container">
        <ul className="side-nav-list">
            <li>Home</li>
            <li>My Activity</li>
            <li>Exercises</li>
            <li>Routines</li>
            <li>Goals</li>
        </ul>
        </div>

    )
}

export default SideNav;
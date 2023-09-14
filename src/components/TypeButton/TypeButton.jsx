import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./TypeButton.css";
import { ReactComponent as Rabbit } from '../../images/rabbitIcon.svg';


function TypeButton() {
  return (
    <>
      <button className="type-button flex flex-col items-center">
        <Rabbit/>
        <div>Speed and Agility</div>
      </button>
    </>
  );
}

export default TypeButton;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./TypeButton.css";
import { ReactComponent as Rabbit } from '../../images/rabbitIcon.svg';
import { ReactComponent as Innovation } from '../../images/innovationIcon.svg';
import { ReactComponent as ABC } from '../../images/abcIcon.svg';
import { ReactComponent as Target } from '../../images/targetIcon.svg';





function TypeButton({icon, label}) {

  return (
    <button className="type-button">
      {icon}  
      <div>{label}</div>
    </button>
  );

}

export default TypeButton;

//script tag that imports
//
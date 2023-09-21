import React, { useState } from "react";
import { ReactDOM } from "react-dom";
import Countdown from 'react-countdown';
import { useSelector } from "react-redux";
 

function Timer() {
const { exercises, currentSession } = useSelector((store) => store.session);
const [minutes, setMinutes] = useState(exercises[0]?.minimum_time_minutes);
console.log({exercises})


  return (
    <Countdown date={Date.now() +  1000}/>
  );
 }
 
 export default Timer;
 
 
 
//  {!isRunning && (
//                 <Button variant="contained" onClick={startTimer}>
//                   Start
//                 </Button>
//               )}
//               {isRunning && (
//                 <Button variant="contained" onClick={pauseTimer}>
//                   Pause
//                 </Button>
//               )}
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './Timer.css';
import Grid from '@mui/material/Grid';

function Timer({ handleNextExercise, exercises }) {
  const [minutes, setMinutes] = useState(exercises[0].minimum_time_minutes);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(69);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(69);
        } else {
          setIsFinished(true);
          setIsRunning(false);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  // Start and pause functions

  function startTimer() {
    if (minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  const callHandleNextExercise = () => {
    handleNextExercise();
    setIsFinished(false);
  };

  return (
    <Grid container justifyContent={'space-between'}>
      <div>
        <h1 id="timer">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </h1>
      </div>

      <div>
        {!isRunning && !isFinished && (
          <Button
            sx={{
              backgroundColor: '#005e83',
              '&:hover': { backgroundColor: '#00384f' },
            }}
            variant="contained"
            onClick={startTimer}
          >
            Start
          </Button>
        )}
        {isRunning && !isFinished && (
          <Button
            sx={{
              color: '#005e83',
              '&:hover': { color: '#00384f' },
            }}
            variant="outlined"
            onClick={pauseTimer}
          >
            Pause
          </Button>
        )}
        {isFinished && (
          <Button
            sx={{
              backgroundColor: '#005e83',
              '&:hover': { backgroundColor: '#00384f' },
            }}
            variant="contained"
            onClick={callHandleNextExercise}
          >
            Next Exercise
          </Button>
        )}
      </div>
    </Grid>
  );
}

export default Timer;

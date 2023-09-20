import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from 'react';
import './SessionPage.css';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Metronome from '../Metronome/Metronome';
import { useCountdownTimer } from 'use-countdown-timer';

function SessionPage() {
  const { exercises, currentSession } = useSelector((store) => store.session);
  const [minutes, setMinutes] = useState(exercises[0].minimum_time_minutes);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  // const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
  //   timer: Date.now() + 1000 * 5
  // })
  // const renderer = ({minutes, seconds, completed}) => {
  //   if (completed) {
  //     return <Completioinist/>;
  //   } else {
  //     return <span>{minutes}:{seconds}</span>;
  //   }
  // }
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
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

  //  Handlers
  const changeSeconds = (event) => {
    setSeconds(event.target.value);
  };

  const changeMinutes = (event) => {
    setMinutes(event.target.value);
  };

  return (
    <div className="background-primary-grey">
      <Grid container className="session-page-padding">
        <Grid
          container
          className="session-page-content-container"
          justifyContent="space-between"
        >
          <Grid
            item
            sm={12}
            sx={{ display: 'inline-flex', marginBottom: '10px' }}
            justifyContent={'space-between'}
          >
            <Grid item>
              <h2 className="exercise-name">
                {exercises[0].name} <FavoriteBorderOutlinedIcon />
              </h2>
              <p className="instrument">Instrument</p>
            </Grid>
            <Grid>
              <input value={minutes} onChange={changeMinutes} />
              <input value={seconds} onChange={changeSeconds} />
            </Grid>
            <Grid item className="start-button">
              {!isRunning && (
                <Button variant="contained" onClick={startTimer}>
                  Start
                </Button>
              )}
              {isRunning && (
                <Button variant="contained" onClick={pauseTimer}>
                  Pause
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              marginBottom: '10px',
            }}
          >
            <p>{exercises[0].description}</p>
            <Grid
              item
              className="buttons"
              sx={{
                marginTop: '10px',
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginRight: '5px',
                }}
              >
                Play Video
                <PlayArrowIcon />
              </Button>
              <Button variant="outlined" size="small">
                Resource Sheet
                <InsertDriveFileIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid
            className="tempo-box"
            item
            xs={12}
            sm={6}
            sx={{
              marginBottom: '8px',
            }}
          >
            <Metronome tempo={exercises[0].minimum_time_minutes} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>Directions:</h3>
            <p>
              <ol>
                <li>Direction one</li>
                <li>Direction two</li>
              </ol>
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              marginBottom: '10px',
            }}
          >
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Write a note..."
              multiline
              rows={6}
              placeholder="Write a note..."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>Remember:</h3>
            <p>
              <ol>
                <li>things to remember list</li>
              </ol>
            </p>
          </Grid>
          <Grid item xs={12} sm={6} textAlign={'right'}>
            <p className="completed">0/6 complete</p>
            <h4 className="end-session">End Session (Exit)</h4>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SessionPage;

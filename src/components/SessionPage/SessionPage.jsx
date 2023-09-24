import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SessionPage.css';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Metronome from '../Metronome/Metronome';

import { useCountdownTimer } from 'use-countdown-timer';
import Timer from '../Timer/Timer';
import Countdown from 'react-countdown';


function SessionPage() {
  const { exercises, currentSession } = useSelector((store) => store.session);



  return (
    currentExercise && (
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
                  {currentExercise.name} <FavoriteBorderOutlinedIcon />
                </h2>
                <p className="instrument">Instrument</p>
              </Grid>
              <Grid>
                <Timer />
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
                    marginRight: '5px',
                    color: '#005e83',
                    "&:hover": { color: '#00384f' }
                  }}
                >
                  
                  Play Video
                  <PlayArrowIcon />
                </Button>
                <Button
                  sx={{
                    color: '#005e83',
                    "&:hover": { color: '#00384f' }
                  }}
                  variant="outlined" size="small">
                  Resource Sheet
                  <InsertDriveFileIcon />
                </Button>
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
                <ol>
                  {currentExercise.directions.map((direction) => {
                    return <li key={direction}>{direction}</li>;
                  })}
                </ol>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  marginBottom: '10px',
                  marginTop: '1rem'
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
                <ol>
                  {currentExercise.remember.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ol>
              </Grid>
              <Grid item xs={12} sm={6} textAlign={'right'}>
                <p className="completed">
                  {completedExercises.length}/
                  {exercises.length + completedExercises.length} complete
                </p>
                <h4 className="end-session">End Session (Exit)</h4>
              </Grid>
            </Grid>
          </Grid>
      </div>
    )
  );
}

export default SessionPage;
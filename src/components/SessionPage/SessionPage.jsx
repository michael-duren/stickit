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
import NotFound from '../NotFoundPage/NotFoundPage';
import MainButton from '../MainButton/MainButton';
import { SESSION_ACTIONS } from '../../redux/actions/session.reducer.actions';
import Timer from '../Timer/Timer';



function SessionPage() {

  const { exercises, completedExercises } = useSelector(
    (store) => store.session
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  const onNextExercise = () => {
    if (exercises.length === 0 && completedExercises.length > 0) {
      history.push('/session/summary/complete');
    }
    if (exercises.length > 1) {
      setCurrentExercise(exercises[1]);
      // remove the current exercise from the array
      dispatch({
        type: SESSION_ACTIONS.ADD_EXERCISE_TO_COMPLETED,
        payload: currentExercise,
      });
    } else {
      setCurrentExercise(exercises[0]);
      // if there is only one exercise left, then add it to the completed exercises
      dispatch({
        type: SESSION_ACTIONS.ADD_EXERCISE_TO_COMPLETED,
        payload: exercises[0],
      });
    }
  };
  useEffect(() => {
    setCurrentExercise(exercises[0]); // get the first exercise in the array
    setIsLoaded(true);
    console.log('current exercise', currentExercise);
  }, []);
  // show not found if somehow they get here without any exercises
  if (isLoaded && exercises.length === 0 && completedExercises.length === 0) {
    return <NotFound />;
  }
  // re route to completed page if all exercises are complete
  if (isLoaded && exercises.length === 0 && completedExercises.length > 0) {
    history.push('/session/summary/complete');
  }


  console.log('current exercise', currentExercise);
  
  
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
            <Timer/>
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






















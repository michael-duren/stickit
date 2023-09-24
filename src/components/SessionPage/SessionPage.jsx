import Grid from '@mui/material/Grid';
import Timer from '../Timer/Timer';
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
import Routes from '../Routes/Routes';
import { SESSION_SAGA_ACTIONS } from '../../redux/actions/session.saga.actions';

function SessionPage() {
  const { exercises, completedExercises, sessionId } = useSelector(
    (store) => store.session
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [notes, setNotes] = useState('');
  const [tempo, setTempo] = useState(60);
  const [minutes, setMinutes] = useState(0);

  const endSession = () => {
    history.push(Routes.SessionSummaryComplete);
  };

  const onNextExercise = () => {
    // Save the current exercise to completedExercises
    let tmpExercise = exercises[0];
    dispatch({
      type: SESSION_SAGA_ACTIONS.COMPLETE_EXERCISE,
      payload: {
        exerciseId: currentExercise.id,
        completedTempo: tempo,
        sessionId,
        exerciseNotes: notes,
        currentExercise,
      },
    });
    if (exercises.length > 1) {
      setCurrentExercise(exercises[1]);
      // remove the current exercise from the array
    } else {
      history.push(Routes.SessionSummaryComplete);
    }
  };
  useEffect(() => {
    setCurrentExercise(exercises[0]); // get the first exercise in the array
    setIsLoaded(true);

    // re route to completed page if all exercises are complete
    if (isLoaded && exercises.length === 0 && completedExercises.length > 0) {
      history.push(Routes.SessionSummaryComplete);
    }
  }, []);

  useEffect(() => {
    let tmpTempo = currentExercise ? currentExercise.bpm_min : 60;
    let tmpMinutes = currentExercise ? currentExercise.minimum_time_minutes : 0;
    setTempo(tmpTempo);
    setMinutes(tmpMinutes);
    setNotes('');
  }, [currentExercise]);

  // show not found if somehow they get here without any exercises
  if (isLoaded && exercises.length === 0 && completedExercises.length === 0) {
    return <NotFound />;
  }
  console.log('currentExercise', currentExercise);

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
                {currentExercise && currentExercise.minimum_time_minutes && (
                  <Timer
                    lastExercise={exercises.length === 1}
                    minutes={Math.floor(minutes)}
                    setMinutes={setMinutes}
                    handleNextExercise={onNextExercise}
                  />
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
              <p>{currentExercise.description}</p>
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
              <Metronome
                tempoState={tempo}
                setTempoState={setTempo}
                tempo={tempo}
              />
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
                marginTop: '1rem',
              }}
            >
              <TextField
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
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
              <h4 onClick={endSession} className="cursor-pointer end-session">
                End Session (Exit)
              </h4>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  );
}
export default SessionPage;

import { Fragment, useEffect, useState } from 'react';
import './SessionCompletePage.css';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CompletionExerciseItem from '../CompletionExerciseItem/CompletionExerciseItem';
import toast from 'react-hot-toast';
import Routes from '../Routes/Routes';

export default function SessionCompletePage() {
  const { duration, completedExercises, exercises, sessionId } = useSelector(
    (store) => store.session
  );
  const [userExerciseData, setUserExerciseData] = useState([]);

  useEffect(() => {
    fetch(`/api/user/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((ex) => setUserExerciseData(ex))
      .catch((e) => {
        console.log(e);
        toast.error('Something went wrong getting exercise data');
      });
  }, []);

  console.log(userExerciseData);

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div className="session-complete-container">
              <h2 className="text-center m-b-xl">
                Great work! Way to use your practice time efficiently
              </h2>
              {completedExercises.length === 0 && (
                <div className="">
                  <p>
                    Nothing here yet, please start over to generate a session
                  </p>
                </div>
              )}
              {completedExercises.map((exercise, i) => (
                <Fragment key={i}>
                  <CompletionExerciseItem
                    exercise={exercise}
                    i={i + 1}
                    isComplete={true}
                    exercises={completedExercises}
                    exerciseData={
                      userExerciseData.filter(
                        (ex) => ex.exercise_id === exercise.id
                      )[0]
                    }
                  />
                </Fragment>
              ))}
              {exercises.map((exercise, i) => (
                <Fragment key={i}>
                  <CompletionExerciseItem
                    exercise={exercise}
                    i={i}
                    exercises={exercises}
                  />
                </Fragment>
              ))}
              <div className="total-complete-time">
                <div>{duration} min</div>
              </div>
              <div className="w-full m-t-xl">
                <div className="m-b-xl">
                  <Link to={Routes.Home}>
                    <MainButton type="button">Share Your Practice</MainButton>
                  </Link>
                </div>
                <div className="m-b-xl">
                  <Link to={Routes.MyActivity}>
                    <MainButton type="button">View Activity</MainButton>
                  </Link>
                </div>
                <div className="m-b-xl">
                  <Link to={Routes.Home}>
                    <MainButton type="button">Back To Home</MainButton>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

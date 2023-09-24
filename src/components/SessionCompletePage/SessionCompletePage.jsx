import './SessionSelectionPage.css';
import InfoIcon from '@mui/icons-material/Info';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as GreenCheck } from '../../images/green-check.svg';
import Grid from '@mui/material/Grid';

export default function SessionCompletePage() {
  const { duration, completedExercises, exercises } = useSelector(
    (store) => store.session
  );

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div className=" items-center gap-16">
              <h2 className="text-center m-b-xl">
                Great work! Way to use your practice time efficiently
              </h2>
              {completedExercises.length === 0 && (
                <div className="">
                  <p>Nothing here yet, please start over to generate a session</p>
                </div>
              )}
              {completedExercises.map((exercise, i) => (
                <div
                  key={exercise.id + i}
                  className="display-flex items-center"
                >
                  <div className="session-container">
                    <div className="exercise-info">
                      <p className="exercise-title">
                        {exercise.warmup && i === 0 ? 'Warm up' : ''}
                        {i === exercise.length - 1 ? 'Cooldown' : ''}
                      </p>
                      <p className="exercise-description">{exercise.name}</p>
                    </div>
                    <div>
                      <p className="exercise-duration">
                        {Math.floor(exercise.minimum_time_minutes)} min
                      </p>
                    </div>
                  </div>
                  <div className="sync-icon">
                    <GreenCheck className="primary-blue p-l-xs" />
                  </div>
                </div>
              ))}
              {exercises.map((exercise, i) => (
                <div
                  key={exercise.id + i}
                  className="justify-center m-t-xl "
                >
                  <div className="session-container">
                    <div className="exercise-info">
                      <p className="exercise-title text-left">
                        {exercise.warmup && i === 0 ? 'Warm up' : ''}
                        {i === exercise.length - 1 ? 'Cooldown' : ''}
                      </p>
                      <p className="exercise-description text-black">{exercise.name}</p>
                    </div>
                    <div>
                      <p className="exercise-duration">
                        {Math.floor(exercise.minimum_time_minutes)} min
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="total-time">{duration} min</div>
              <div className="m-t-xl">
                <div className='m-b-xl'>
                  <Link to={'/session/current/'}>
                    <MainButton type="button">Share Your Practice</MainButton>
                  </Link>
                </div>
                <div className='m-b-xl'>
                  <Link to={'/session/current/'}>
                    <MainButton type="button">View Activity</MainButton>
                  </Link>
                </div>
                <div className='m-b-xl'>
                  <Link to={'/home'}>
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

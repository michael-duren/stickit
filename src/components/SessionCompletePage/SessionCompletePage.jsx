import './SessionSelectionPage.css';
import InfoIcon from '@mui/icons-material/Info';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as GreenCheck } from '../../images/green-check.svg';

export default function SessionCompletePage() {
  const { duration, completedExercises, exercises } = useSelector(
    (store) => store.session
  );

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <div className="flex flex-col w-full items-center gap-16">
        <h2 className="text-center">
          Great work! Way to use your practice time efficiently
        </h2>
        {completedExercises.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full mt-16">
            <p>Nothing here yet, please start over to generate a session</p>
          </div>
        )}
        {completedExercises.map((exercise, i) => (
          <div
            key={exercise.id + i}
            className="display-flex items-center justify-center main-button-width"
          >
            <div className="session-container exercise main-button-width justify-around">
              <div className="exercise-info flex flex-col flex-1">
                <p className="exercise-title">
                  {exercise.warmup && i === 0 ? 'Warm up' : ''}
                  {i === exercise.length - 1 ? 'Cooldown' : ''}
                </p>
                <p className="exersice-description">{exercise.name}</p>
              </div>
              <div>
                <p className="exercise-duration">
                  {Math.floor(exercise.minimum_time_minutes)} min
                </p>
              </div>
            </div>
            <div className="sync-icon">
              <GreenCheck className="primary-blue" />
            </div>
          </div>
        ))}
        {exercises.map((exercise, i) => (
          <div
            key={exercise.id + i}
            className="display-flex items-center justify-center main-button-width"
          >
            <div className="session-container exercise main-button-width justify-around">
              <div className="exercise-info flex flex-col flex-1">
                <p className="exercise-title">
                  {exercise.warmup && i === 0 ? 'Warm up' : ''}
                  {i === exercise.length - 1 ? 'Cooldown' : ''}
                </p>
                <p className="exersice-description">{exercise.name}</p>
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

        <div className="flex flex-col gap-16 items-center justify-center w-full mt-16">
          <Link to={'/session/current/'}>
            <MainButton type="button">Share Your Practice</MainButton>
          </Link>
          <Link to={'/session/current/'}>
            <MainButton type="button">View Activity</MainButton>
          </Link>
          <Link to={'/home'}>
            <MainButton type="button">Back To Home</MainButton>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

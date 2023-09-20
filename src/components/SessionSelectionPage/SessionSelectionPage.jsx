import './SessionSelectionPage.css';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SessionSelectionPage() {
  const { duration, exercises } = useSelector((store) => store.session);

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <div className="flex flex-col w-full items-center gap-16">
        <h2 className="text-center">Your smart session:</h2>
        {exercises.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full mt-16">
            <p>Nothing here yet, please start over to generate a session</p>
          </div>
        )}
        {exercises.map((exercise, i) => (
          <div
            key={exercise.id + i}
            className="display-flex items-center justify-center main-button-width"
          >
            <div className="session-container exercise main-button-width justify-around">
              <div>
                <InfoIcon className="primary-blue" />
              </div>
              <div className="exercise-info flex flex-col flex-1">
                <p className="exercise-title">
                  {exercise.warmup && i === 0 ? 'Warm up' : ''}
                  {i === exercise.length - 1 ? 'Cooldown' : ''}
                </p>
                <p className="exersice-description">{exercise.name}</p>
              </div>
              <div>
                <p className="exercise-duration">5 min</p>
              </div>
            </div>
            <div className="sync-icon">
              <SyncIcon className="primary-blue" />
            </div>
          </div>
        ))}
        <div className="total-time">{duration} min</div>

        <div className="flex flex-col items-center justify-center w-full mt-16">
          <Link to={'/session'}>
            <MainButton type="button">Begin Session</MainButton>
          </Link>
          <div className="flex main-button-width">
            <Link to="/session/type">
              <button className="m-t-xl empty-button primary-blue">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

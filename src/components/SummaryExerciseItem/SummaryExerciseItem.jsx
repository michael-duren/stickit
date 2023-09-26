import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import './SummaryExerciseItem.css';
import { useSelector } from 'react-redux';

/**
 * @param {import('../../redux/reducers/session.reducer.types').Exercise} exercise
 */

export default function SummaryExerciseItem({ exercise, i, refreshExercise }) {
  const { isRefreshingExercise, refreshingItemOrder } = useSelector(
    (store) => store.session
  );
  const [showPopup, setShowPopup] = useState(false);

  const getType = (typeId) => {
    switch (typeId) {
      case 1:
        return 'Speed & Agility';
      case 2:
        return 'Creativity & Improvisation';
      case 3:
        return 'Style & Vocabulary';
      case 4:
        return 'Precision & Timekeeping';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      key={exercise.id + i}
      className="display-flex exercise-container items-center justify-center"
    >
      <div className="exercise-blue-container exercise justify-around">
        <div
          className={`exercise-popup ${
            showPopup ? 'exercise-popup-active shadow-xl' : ''
          }`}
          style={{ zIndex: i + 10 }}
        >
          <h3>{exercise.name}</h3>
          <p>{exercise.description}</p>
        </div>
        <button onClick={() => setShowPopup(!showPopup)}>
          <InfoIcon className="" />
        </button>
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
      <button
        onClick={() => refreshExercise(exercise)}
        className={`sync-icon `}
      >
        <SyncIcon
          className={`${
            isRefreshingExercise && refreshingItemOrder === i + 1
              ? 'animate-spin'
              : ''
          }`}
        />
      </button>
    </div>
  );
}

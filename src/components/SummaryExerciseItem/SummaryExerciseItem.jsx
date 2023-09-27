import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import './SummaryExerciseItem.css';
import { useSelector } from 'react-redux';
import { toTitleCase } from '../../utils/toTileCase';
import { ReactComponent as RefreshIcon } from '../../images/refresh.svg';

/**
 * @param {import('../../redux/reducers/session.reducer.types').Exercise} exercise
 */

export default function SummaryExerciseItem({ exercise, i, refreshExercise }) {
  const { isRefreshingExercise, refreshingItemOrder, exercises } = useSelector(
    (store) => store.session
  );
  const [showPopup, setShowPopup] = useState(false);
  const [exerciseType, setExerciseType] = useState('');

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

    if (i === 0) {
      setExerciseType('Warm Up');
    } else if (i === exercises.length - 1) {
      setExerciseType('Cool Down');
    } else {
      setExerciseType(getType(exercise.type_id));
    }

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
      <div className="exercise-blue-container">
        {/* POP UP */}
        <div
          className={`exercise-popup ${
            showPopup ? 'exercise-popup-active shadow-xl' : ''
          }`}
          style={{ zIndex: i + 10 }}
        >
          <h3>{exercise.name}</h3>
          <p>{exercise.description}</p>
        </div>
        {/* INFO BUTTON */}
        <button onClick={() => setShowPopup(!showPopup)}>
          <InfoIcon className="" />
        </button>
        <div className="exercise-info">
          <p className="exercise-type">{exerciseType}</p>
          <p className="exersice-title">{toTitleCase(exercise.name)}</p>
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
        <RefreshIcon
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

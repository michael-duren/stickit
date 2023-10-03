import { useEffect, useState } from 'react';
import './CompletionExerciseItem.css';
import { ReactComponent as GreenCheck } from '../../images/green-check.svg';
import { toTitleCase } from '../../utils/toTileCase';
import { ReactComponent as HeartIcon } from '../../images/heart.svg';
import { ReactComponent as NotesIcon } from '../../images/notes.svg';
import { getType } from '../../utils/getExerciseType';

export default function CompletionExerciseItem({
  exercise,
  i,
  isComplete,
  exercises,
  exerciseData,
}) {
  const [exerciseType, setExerciseType] = useState('');

  useEffect(() => {
    if (i === 0) {
      setExerciseType('Warm Up');
    } else if (i === exercises.length - 1) {
      setExerciseType('Cool Down');
    } else {
      setExerciseType(getType(exercise.type_id));
    }
  }, []);

  return (
    <div key={i} className="exercise-complete-container">
      <div className="exercise-complete-blue-container">
        <div className="flex flex-col">
          <NotesIcon
            className={`${
              exerciseData && exerciseData.exercise_notes ? '' : 'invisible'
            }`}
          />
          {exerciseData && exerciseData.hearted && (
            <HeartIcon className="heart-icon" />
          )}
        </div>
        <div className="exercise-complete-info">
          <p className="exercise-complete-type text-left">{exerciseType}</p>
          <p className="exercise-complete-title text-black">
            {toTitleCase(exercise.name)}
          </p>
        </div>
        <div>
          <p className="exercise-complete-duration">
            {Math.floor(exercise.minimum_time_minutes)} min
          </p>
        </div>
      </div>
      <div>{isComplete && <GreenCheck />}</div>
    </div>
  );
}

import { ReactComponent as HeartOutlineIcon } from '../../images/heart-outline.svg';
import { useEffect, useState } from 'react';
import './FavoriteButton.css';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function FavoriteButton({ exercise }) {
  const { userExerciseDetails } = useSelector(
    (store) => store.sessionUserDetails
  );
  const [isShaking, setIsShaking] = useState(false);
  const [isHearted, setIsHearted] = useState(userExerciseDetails.hearted);

  useEffect(() => {
    if (isShaking) {
      const animationDuration = 1000;
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, animationDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShaking]);

  useEffect(() => {
    setIsHearted(userExerciseDetails.hearted);
  }, [userExerciseDetails]);

  const handleHeartClick = async () => {
    setIsShaking(true);
    if (isHearted) {
      try {
        const result = await fetch(`/api/user/exercises/heart/${exercise.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (result.status !== 204) toast.error('Could not dislike exercise.');
        if (result.status === 204) {
          setIsHearted(false);
          toast.success('Exercise removed from favorites.');
        }
      } catch (error) {
        console.error(`Error in handleHeartClick: ${error}`);
        toast.error('Could not dislike exercise.');
      }
    } else {
      try {
        const result = await fetch(`/api/user/exercises/heart/${exercise.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (result.status === 201) {
          setIsHearted(true);
          toast.success('Exercise added to favorites.');
        }
      } catch (error) {
        console.error(`Error in handleHeartClick: ${error}`);
        toast.error('Could not like exercise');
      }
    }
  };

  return (
    <button
      onClick={handleHeartClick}
      className={`${isShaking ? 'animate-shake' : ''} heart-button`}
    >
      <HeartOutlineIcon
        className={`${
          isHearted ? 'heart-button-fill' : 'heart-button-outline'
        } heart-button-icon`}
      />
      {/* <HeartIconOutline className={'heart-button-outline'} /> */}
    </button>
  );
}

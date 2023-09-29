import { ReactComponent as HeartIconFill } from '../../images/heart.svg';
import { ReactComponent as HeartIconOutline } from '../../images/heart-outline.svg';
import { useEffect, useState } from 'react';
import './FavoriteButton.css';
import toast from 'react-hot-toast';

export default function FavoriteButton({ exercise }) {
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    fetch(`/api/user/exercises/heart/${exercise.id}`);
  }, []);

  const handleHeartClick = async () => {
    if (isHearted) {
      try {
        const result = await fetch(`/api/user/exercises/heart/${exercise.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (result.status === 204) setIsHearted(false);
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
        if (result.status === 201) setIsHearted(true);
      } catch (error) {
        console.error(`Error in handleHeartClick: ${error}`);
        toast.error('Could not like exercise');
      }
    }
  };

  return (
    <button
      onClick={handleHeartClick}
      className="heart-button transform-all duration-300"
    >
      {isHearted ? (
        <HeartIconFill className={'heart-button-fill'} />
      ) : (
        <HeartIconOutline className={'heart-button-outline'} />
      )}
    </button>
  );
}

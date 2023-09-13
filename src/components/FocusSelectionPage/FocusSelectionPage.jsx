import { useParams } from 'react-router-dom';
import NotFound from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import './FocusSelectionPage.css';

export default function FocusSelectionPage() {
  const { id } = useParams();
  const [type, setType] = useState('Test'); // set type for page
  const [focuses, setFocuses] = useState([]); // set focuses

  if (id > 4 || id < 1) {
    return <NotFound />;
  }

  useEffect(() => {
    switch (+id) {
      case 1:
        setType('Speed & Agility');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 2:
        setType('Creativity & Improvisation');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 3:
        setType('Style & Vocabulary');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 4:
        setType('Precision & Timekeeping');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
    }
  }, []);

  return (
    <div className="flex container gap-16 flex-col items-center">
      <h2>What specifically would you like to work on for {type}</h2>
      <div className="flex m-b-xl gap-16 flex-col h-full items-center">
        {focuses.map((focus) => {
          return (
            <div key={focus.id}>
              <button className="btn-focus-select">{focus.name}</button>
            </div>
          );
        })}
      </div>
      <div className="flex items-center flex-col gap-16 w-full">
        <button className="w-half btn">Next</button>
        <div className="w-half">
          <button className="border-none text-blue">Back</button>
        </div>
      </div>
    </div>
  );
}

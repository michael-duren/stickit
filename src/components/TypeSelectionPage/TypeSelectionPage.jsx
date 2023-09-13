import { useDispatch } from 'react-redux';

export default function TypeSelectionPage() {
  const dispatch = useDispatch();
  const types = [
    { id: 1, name: 'Speed & Agility' },
    { id: 2, name: 'Creativity & Improvisation' },
    { id: 3, name: 'Style & Vocabulary' },
    { id: 4, name: 'Precision & Timekeeping' },
  ];
  const addType = (type) => console.log(type);

  return (
    <div>
      <h2>What would you like to work on today?</h2>
      <p>Select which areas you'd like to focus your practice on.</p>
      <div>
        {types.map((type) => {
          return (
            <div key={type.id}>
              <button className="btn">{type.name}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

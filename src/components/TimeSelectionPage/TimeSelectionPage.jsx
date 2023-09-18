import './TimeSelectionPage.css';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function TimeSelectionPage() {
  const [minutes, setMinutes] = useState(30);
  const [hours, setHours] = useState(0);
  const disptach = useDispatch();
  const { timeInMinutes } = useSelector((state) => state.sessionForm);
  const minuteRange = [0, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const hourRange = [0, 1, 2, 3, 4];

  const handleTimeChange = (e) => {};

  return (
    <MainLayout showNav={true} exitButton={true}>
      <div className="flex flex-col gap-16 items-center">
        <p>How much time do you have?</p>
        <div className="gap-16 flex flex-col">
          <div className="flex gap-16 items-center">
            <select className="time-title">
              hours
              {hourRange.map((hour) => (
                <option value={hour} key={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <span className="time-title">hours</span>
          </div>
          <div className="flex gap-16 items-center">
            <select>
              {minuteRange.map((minute) => (
                <option value={minute} key={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <span className="time-title">minutes</span>
          </div>
        </div>
        <MainButton>Next</MainButton>
      </div>
    </MainLayout>
  );
}

export default TimeSelectionPage;

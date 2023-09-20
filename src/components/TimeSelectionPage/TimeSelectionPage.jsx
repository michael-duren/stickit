import './TimeSelectionPage.css';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { useHistory } from 'react-router-dom';

function TimeSelectionPage() {
  const history = useHistory();
  const [minutes, setMinutes] = useState(30);
  const [hours, setHours] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const disptach = useDispatch();
  const minuteRange = [0, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const hourRange = [0, 1, 2, 3, 4];

  useEffect(() => {
    setTotalTime(hours * 60 + minutes);
  }, [minutes, hours]);

  const setTimeAndNavigate = () => {
    disptach({
      type: SESSION_FORM_ACTIONS.SET_TIME_IN_MINUTES,
      payload: totalTime,
    });

    history.push('/session/type');
  };

  return (
    <MainLayout showNav={true}>
      <div className="flex flex-col gap-16 items-center">
        <p>How much time do you have?</p>
        <div className="gap-16 flex flex-col">
          <div className="flex gap-16 items-center">
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="time-title"
            >
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
            <select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {minuteRange.map((minute) => (
                <option value={minute} key={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <span className="time-title">minutes</span>
          </div>
        </div>
        <div>
          {totalTime < 15 && (
            <p className="text-error">Please Select at least 15 Minutes</p>
          )}
        </div>
        <MainButton
          disabled={totalTime < 15}
          type="button"
          onClick={setTimeAndNavigate}
        >
          Next
        </MainButton>
      </div>
    </MainLayout>
  );
}

export default TimeSelectionPage;

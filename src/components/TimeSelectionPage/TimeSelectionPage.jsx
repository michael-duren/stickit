import './TimeSelectionPage.css';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';

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
      <Grid>
        <Grid justifyContent={'center'} container>
         <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div className='full-width'>
              <p className='m-b-xl'>How much time do you have?</p>
              <div>
                <div className='m-b-l'>
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
                  <span className="time-title p-l-l">hours</span>
                </div>
                <div className='m-b-xl'>
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
                  <span className="time-title p-l-l">minutes</span>
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
                Start
              </MainButton>
            </div>
          </Grid>

        </Grid>

      </Grid>
    </MainLayout>
  );
}

export default TimeSelectionPage;

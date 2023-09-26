import { useState, useEffect } from 'react';
import './SessionSummaryPage.css';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import Stepper from '../Stepper/Stepper';
import SummaryExerciseItem from '../SummaryExerciseItem/SummaryExerciseItem';
import { SESSION_ACTIONS } from '../../redux/actions/session.reducer.actions';
import { SESSION_SAGA_ACTIONS } from '../../redux/actions/session.saga.actions';

export default function SessionSummaryPage() {
  const { duration, exercises, sessionId } = useSelector(
    (store) => store.session
  );
  const { totalSteps } = useSelector((store) => store.sessionForm);
  const dispatch = useDispatch();
  const [steps, setSteps] = useState(3);

  useEffect(() => {
    setSteps(totalSteps);
  }, [totalSteps]);

  const resetSessionForm = () => {
    dispatch({ type: SESSION_FORM_ACTIONS.RESET_SESSION_FORM });
  };

  const refreshExercise = (exercise) => {
    dispatch({
      type: SESSION_SAGA_ACTIONS.REFRESH_EXERCISE,
      payload: { exercise, sessionId },
    });
    dispatch({
      type: SESSION_ACTIONS.SET_REFRESHING_ORDER_NUMBER,
      payload: exercise.exercise_order,
    });
  };

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div className="w-full">
              <div className="w-full flex items-center justify-center m-b-xl">
                <Stepper steps={steps} currentStep={steps} />
              </div>
              <h2 className="text-center m-b-xl">Your smart session:</h2>
              {exercises.length === 0 && (
                <div className="">
                  <p>
                    Nothing here yet, please start over to generate a session
                  </p>
                </div>
              )}
              {exercises.map((exercise, i) => (
                <SummaryExerciseItem
                  refreshExercise={refreshExercise}
                  exercise={exercise}
                  i={i}
                />
              ))}
              <div className="total-time m-t-xl m-b-xl">{duration} min</div>

              <div className="">
                <Link className="" to={'/session/current/'}>
                  <MainButton onClick={resetSessionForm} type="button">
                    Begin Session
                  </MainButton>
                </Link>
                <div className="text-left">
                  <Link to="/session/type">
                    <button className="m-t-xl empty-button primary-blue">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

import './SessionSelectionPage.css';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';

export default function SessionSelectionPage() {
  const { duration, exercises } = useSelector((store) => store.session);
  const dispatch = useDispatch();

  const resetSessionForm = () => {
    dispatch({ type: SESSION_FORM_ACTIONS.RESET_SESSION_FORM });
  };

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div className="">
              <h2 className="text-center">Your smart session:</h2>
              {exercises.length === 0 && (
                <div className="">
                  <p>
                    Nothing here yet, please start over to generate a session
                  </p>
                </div>
              )}
              {exercises.map((exercise, i) => (
                <div
                  key={exercise.id + i}
                  className="display-flex items-center justify-center main-button-width"
                >
                  <div className="session-container exercise main-button-width justify-around">
                    <div>
                      <InfoIcon className="primary-blue" />
                    </div>
                    <div className="exercise-info flex flex-col flex-1">
                      <p className="exercise-title">
                        {exercise.warmup && i === 0 ? 'Warm up' : ''}
                        {i === exercise.length - 1 ? 'Cooldown' : ''}
                      </p>
                      <p className="exersice-description">{exercise.name}</p>
                    </div>
                    <div>
                      <p className="exercise-duration">5 min</p>
                    </div>
                  </div>
                  <div className="sync-icon">
                    <SyncIcon className="primary-blue" />
                  </div>
                </div>
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

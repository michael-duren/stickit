import SideNav from '../components/SideNav/SideNav';
import Grid from '@mui/material/Grid';
import './MainLayout.css';
import { useDispatch } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../redux/actions/session-form.reducer.actions';
import { useHistory } from 'react-router-dom';
import { SESSION_ACTIONS } from '../redux/actions/session.reducer.actions';

export default function MainLayout({ children, showExitButton, showNav }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const resetForm = () => {
    dispatch({ type: SESSION_FORM_ACTIONS.RESET_SESSION_FORM });
    dispatch({ type: SESSION_ACTIONS.RESET_SESSION });
    history.push('/');
  };

  return (
    <div className="background-primary-grey h-full flex-1">
      <Grid className="h-full main-page-padding">
        <Grid className="h-full" container>
          {showNav && (
            <Grid
              item
              md={2}
              lg={2}
              sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            >
              <SideNav />
            </Grid>
          )}
          <Grid item justifyContent={'center'} xs={12} sm={12} md={10} lg={10}>
            <div className="main-page-content-container flex flex-col h-full text-center">
              {showExitButton && (
                <button
                  onClick={resetForm}
                  className="exit-btn-width p-2 text-left empty-button primary-blue text-bold"
                >
                  <p>Exit</p>
                </button>
              )}
              {children}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

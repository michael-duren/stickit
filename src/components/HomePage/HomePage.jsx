import React from 'react';
import Grid from '@mui/material/Grid';
import './HomePage.css';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../Routes/Routes';

function MainPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const { exercises } = useSelector((store) => store.session);

  const routeToSessionOrForm = () => {
    if (exercises.length > 0) {
      history.push(Routes.SessionPage);
    } else {
      history.push(Routes.TimeSelection);
    }
  };

  return (
    <>
      <MainLayout showNav>
        <Grid container justifyContent={'center'}>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div>
              <div className="m-b-xl">
                <h2>Hi, {user.firstName}.</h2>
                <p className="welcome-text">
                  Take a moment to generate a tailored practice <br /> routine
                  based on your focus areas and time available.
                </p>
              </div>
              <MainButton onClick={routeToSessionOrForm}>
                Begin Smart Session
              </MainButton>
            </div>
          </Grid>
        </Grid>
      </MainLayout>
    </>
  );
}

export default MainPage;

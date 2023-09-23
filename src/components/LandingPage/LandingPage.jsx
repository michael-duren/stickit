import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import './LandingPage.css';
import logoImg from '../../images/Logo.svg';
import LoginForm from '../LoginForm/LoginForm';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TypeButton from '../TypeButton/TypeButton';
import Routes from '../Routes/Routes';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push(Routes.Login);
  };

  return (
    <div className="login-background main-container">
      <Grid>
        <Grid
          container
          justifyContent={'center'}
          item
          lg={12}
          className="primary-white"
        >
          <Grid
            container
            justifyContent={'center'}
            alignItems={'end'}
            className="p-t-xl"
          >
            <Grid item>
              <img className="p-r-l" src={logoImg} alt="drums" />
            </Grid>
            <Grid item>
              <h1 className="p-t-xl">StickIt</h1>
            </Grid>
          </Grid>
          <p className="m-b-xl m-t-xl">Practice better.</p>
        </Grid>
      </Grid>
      <div className="login-padding">
        <LoginForm />
      </div>
      <div className="text-center primary-white">
        <p>
          Copyright © 2023 StickItPracticeApp.com® Patented and Patents Pending
        </p>
      </div>
    </div>
  );
}

export default LandingPage;

import React from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import logoImg from "../../images/Logo.svg";


function RegisterPage() {
  const history = useHistory();

  return (
    <div className='login-background main-container'>
      <Grid>
        <Grid container justifyContent={"center"} item lg={12} className="primary-white">
          <Grid  container justifyContent={"center"} alignItems={'end'} className="p-t-xl">
            <Grid item>
              <img className="p-r-l" src={logoImg} alt='drums' />
            </Grid>
            <Grid>
              <h1 className="p-t-xl">StickIt</h1>
            </Grid>

          </Grid>
          <p className="m-b-xl m-t-xl">Practice better.</p>
        </Grid>
      </Grid>
      <div className="login-padding">
      <RegisterForm />
      </div>
    
      <div className="text-center login-footer primary-white">
          <p>
            Copyright © 2023 StickItPracticeApp.com® Patented and Patents Pending
          </p>
        </div>
    </div>
  );
};

export default RegisterPage;

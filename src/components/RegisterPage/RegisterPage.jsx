import React from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import logoImg from "../../images/Logo.svg";


function RegisterPage() {
  const history = useHistory();

  return (
    <div className='background-primary-blue main-container'>
      <Grid>
        <Grid container justifyContent={"center"} item lg={12} className="primary-white">
          <Grid container justifyContent={"center"} alignItems={'center'}>
            <Grid item>
              <img src={logoImg} alt='drums' />
            </Grid>
            <Grid>
              <h1>StickIt</h1>
            </Grid>

          </Grid>
          <p>Practice better.</p>
        </Grid>
      </Grid>
      <RegisterForm />

      
      <div className="text-center login-footer primary-white">
          <p>
            Copyright © 2023 StickItPracticeApp.com® Patented and Patents Pending
          </p>
        </div>
    </div>
  );
};

export default RegisterPage;

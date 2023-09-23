import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import SideNav from '../SideNav/SideNav';
import { useSelector } from 'react-redux';
import './HomePage.css';
import Button from '@mui/material/Button';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import { Link } from 'react-router-dom';
import Timer from '../Timer/Timer';

function MainPage() {
  const user = useSelector((store) => store.user);
  return (
    <>
    <MainLayout showNav>
      <Grid container justifyContent={'center'}>
      <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
        <div>
        <div className='m-b-xl'>
          <h2>Hi, {user.firstName}.</h2>
          <p className="welcome-text">
            Take a moment to generate a tailored practice <br /> routine based on your
            focus areas and time available.
          </p>
          <Timer/>
        </div>
        <Link to="/session/time-selection">
          <MainButton>Begin Smart Session</MainButton>
        </Link>
      </div>
        </Grid>
      </Grid>
    </MainLayout>
    </>
  );
}

export default MainPage;

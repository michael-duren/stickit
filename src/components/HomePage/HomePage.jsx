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

function MainPage() {
  const user = useSelector((store) => store.user);
  return (
    <MainLayout showNav>
      <div className="h-full flex flex-col items-center gap-16">
        <div className="main-button-width">
          <h2>Hi, {user.firstName}.</h2>
          <p className="welcome-text">
            Take a moment to generate a tailored practice routine based on your
            focus areas and time available.
          </p>
        </div>
        <Link to="/session/time-selection">
          <MainButton>Begin Smart Session</MainButton>
        </Link>
      </div>
    </MainLayout>
  );
}

export default MainPage;

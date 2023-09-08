import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className='side-by-side'>
      <h2 className='header-padding border-blue'>Welcome, {user.username}!</h2>
      <p className='border-red'>Your ID is: {user.id}</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

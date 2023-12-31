import React from 'react';
import { useDispatch } from 'react-redux';
import '../Nav/Nav.css'

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className='logout-button background-primary-blue primary-white' 
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <span className='sign-out'>Sign Out</span>
    </button>
  );
}

export default LogOutButton;

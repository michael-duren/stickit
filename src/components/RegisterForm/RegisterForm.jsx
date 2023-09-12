import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      },
    });
  }; // end registerUser

  return (
    <>
      <form className="formPanel" onSubmit={registerUser}>
        <h2 style={{textAlign: 'center'}}>Create Account</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className='m-b-xl'>
          <label htmlFor="firstName">
            <TextField
              fullWidth
              type="firstName"
              name="firstName"
              placeholder='First Name'
              id='outlined-size-small'
              size='small'
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div className='m-b-xl'>
          <label htmlFor="lastName">
            <TextField
              fullWidth
              type="lastName"
              name="lastName"
              placeholder='Last Name'
              id='outlined-size-small'
              size='small'
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
        <div className='m-b-xl'>
          <label htmlFor="username">
            <TextField
              fullWidth
              type="text"
              name="username"
              placeholder='Email'
              id='outlined-size-small'
              size='small'
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div className='m-b-xl'>
          <label htmlFor="password">
            <TextField
              fullWidth
              type="password"
              name="password"
              placeholder='Password'
              id='outlined-size-small'
              size='small'
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <Button fullWidth variant='contained' className="btn" type="submit" name="submit" value="Create Account">Create Account</Button>
        </div>
      </form>
      {/* <div className='text-center formPanel'>
        <p>Already have an account?</p>
        <Button
          variant='outlined'
          fullWidth
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </div> */}

    </>

  );
}

export default RegisterForm;

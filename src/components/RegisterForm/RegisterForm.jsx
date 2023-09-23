import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MainButton from '../MainButton/MainButton';
import Button from '@mui/material/Button';
import Routes from '../Routes/Routes';

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
        lastName: lastName,
        lastName: lastName,
      },
    });
  }; // end registerUser

  return (
    <>
      <form className="formPanel" onSubmit={registerUser}>
        <h2 className="text-black m-b-xl" style={{ textAlign: 'center' }}>
          Create Account
        </h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="m-b-xl">
          <label htmlFor="firstName">
            <TextField
              fullWidth
              type="firstName"
              name="firstName"
              placeholder="First Name"
              id="outlined-size-small"
              size="small"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div className="m-b-xl">
          <label htmlFor="lastName">
            <TextField
              fullWidth
              type="lastName"
              name="lastName"
              placeholder="Last Name"
              id="outlined-size-small"
              size="small"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
        <div className="m-b-xl">
          <label htmlFor="username">
            <TextField
              fullWidth
              type="text"
              name="username"
              placeholder="Email"
              id="outlined-size-small"
              size="small"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div className="m-b-xl">
          <label htmlFor="password">
            <TextField
              fullWidth
              type="password"
              name="password"
              placeholder="Password"
              id="outlined-size-small"
              size="small"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <MainButton
            fullWidth
            onClick={registerUser}
            variant="contained"
            className="btn"
            type="submit"
            name="submit"
            value="Create Account"
          >
            Create Account
          </MainButton>
        </div>
      </form>
      <div className="text-center formPanel">
        <Button
          variant="outlined"
          f
          fullWidth
          className="btn btn_asLink"
          sx={{
            border: '1px solid #005e83',
            color: '#005e83',
            fontWeight: '600',
            '&:hover': { backgroundColor: '#005e83', color: 'white' },
            '&:focus': { backgroundColor: '#00394d', color: 'white' },
          }}
          onClick={() => {
            history.push(Routes.Login);
          }}
        >
          <p>Sign in</p>
        </Button>
      </div>
    </>
  );
}

export default RegisterForm;

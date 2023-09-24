import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MainButton from '../MainButton/MainButton';
import Routes from '../Routes/Routes';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
      <form className="formPanel" onSubmit={login}>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="m-b-xl">
          <label htmlFor="username">
            <TextField
              fullWidth
              type="text"
              name="username"
              placeholder="Email"
              id="outlined-size-small"
              size="small"
              required
              value={username}
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
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div className="m-b-xl">
          <MainButton
            onClick={login}
            fullWidth
            variant="contained"
            className="btn"
            type="submit"
            name="submit"
            value="Sign In"
          >
            Sign In
          </MainButton>
        </div>
        <div className="text-center">
          <a href="#">Forgot username or password?</a>
        </div>
      </form>
      <div className="text-center formPanel">
        <p className="m-b-l dark-gray">or,</p>
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
            history.push(Routes.Registration);
          }}
        >
          <p>Create Account</p>
        </Button>
      </div>
    </>
  );
}

export default LoginForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
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
            placeholder="Username"
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
        <Button fullWidth variant="contained" className="btn" type="submit" name="submit" value="Sign In" >Sign In</Button> 
      </div>
      <div className="text-center">
      <a href="#" >Forgot username or password?</a>
        </div>
    </form>
    <div className="text-center formPanel">
      <p>or,</p>
      <Button 
      variant="outlined" f
      fullWidth
      className="btn btn_asLink"
      onClick={() => {
        history.push('/registration');
      }}
      >
        Create Account
        </Button>
    </div>

    </>
  );
}

export default LoginForm;

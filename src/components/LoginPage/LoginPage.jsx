import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Routes from '../Routes/Routes';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push(Routes.Registration);
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;

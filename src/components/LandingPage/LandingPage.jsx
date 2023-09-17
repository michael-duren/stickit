import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./LandingPage.css";
import logoImg from "../../images/Logo.svg";
import LoginForm from "../LoginForm/LoginForm";
// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TypeButton from "../TypeButton/TypeButton";


function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="background-primary-blue main-container">
        <Grid>
          <Grid container justifyContent={"center"} item lg={12} className="primary-white">
            <Grid container justifyContent={"center"} alignItems={'center'}>
              <Grid item>
                <img src={logoImg} alt="drums" />
              </Grid>
              <Grid item>
                <h1>StickIt</h1>
              </Grid>
            </Grid>
            <p>Practice better.</p>
            
          </Grid>
        </Grid>
    <LoginForm />
        <div className="text-center primary-white">
          <p>
            Copyright © 2023 StickItPracticeApp.com® Patented and Patents Pending
          </p>
        </div>
    </div>
  );
}

export default LandingPage;

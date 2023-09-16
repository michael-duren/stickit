import Grid from "@mui/material/Grid";
import React from "react";
import "./SessionPage.css";
import { useSelector } from "react-redux";


function SessionPage() {
  const exercise = useSelector((store) => store.sessionReducer)

  return (
    <div className="background-primary-grey">
      <Grid container className="session-page-padding">
        
          <Grid container className="session-page-content-container text-left">

            <Grid item justifyContent={'left'} mg={6} lg={6}>
              <h2>Exercise Name</h2>
              <h3>Instrument</h3>
              <p>Exercise details go here</p>

            </Grid>
          </Grid>
        
      </Grid>
    </div>
  )
}

export default SessionPage;
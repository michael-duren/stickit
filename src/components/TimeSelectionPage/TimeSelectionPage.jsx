import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SideNav from '../SideNav/SideNav';
import { useSelector } from 'react-redux';
import "./TimeSelectionPage.css";
import Button from "@mui/material/Button";

function TimeSelectionPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="background-primary-grey">
      <Grid className="main-page-padding">
        <Grid container>
          <Grid item md={1} lg={1}>
            <SideNav />
          </Grid>
          <Grid item justifyContent={'center'} md={11} lg={11}>
            <div className="main-page-content-container text-center">
              <div>
                <p>How much time do you have?</p>
                <div className="select-time-hours">
                  <select className="time-title">hours
                    <option value="15">1</option>
                    <option value="20">2</option>
                    <option value="25">3</option>
                    <option value="30">4</option>
                  </select>
                  <span className="time-title">hours</span>
                </div>
                <div className="select-time-hours">
                  <select>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                  </select>
                  <span className="time-title">minutes</span>
                </div>
                <Button fullWidth variant="contained" className="btn" type="submit" name="submit">Next</Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>

  )
}

export default TimeSelectionPage;
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SideNav from '../SideNav/SideNav';
import {useSelector} from 'react-redux';
import "./HomePage.css";
import  Button  from "@mui/material/Button";

function MainPage() {
    const user = useSelector((store) => store.user);
    return(
        <div className="background-primary-grey">
                <Grid className="main-page-padding">
                    <Grid container>
                        <Grid item md={1}lg={1}>
                            <SideNav />
                        </Grid>
                        <Grid item justifyContent={'center'} md={11} lg={11}>
                        <div className="main-page-content-container text-center">
                            <Grid item justifyContent={'center'} lg={3}>
                                <h2>Hi, {user.firstName}.</h2>
                                <p>
                                    Take a moment to generate a tailored practice routine based on your focus areas and time available.
                                </p>
                                <Button fullWidth variant="contained" className="btn" type="submit" name="submit" value="Sign In" >Begin Smart Session</Button> 
                            </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
        </div>

    )
}

export default MainPage;
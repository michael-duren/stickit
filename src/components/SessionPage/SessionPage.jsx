import Grid from "@mui/material/Grid";
import React from "react";
import "./SessionPage.css";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


function SessionPage() {
  const exercise = useSelector((store) => store.sessionReducer)

  return (
    <div className="background-primary-grey">
      <Grid container className="session-page-padding">
        <Grid container className="session-page-content-container" justifyContent='space-between'>
          <Grid item sm={12}>
          <div className="start-button">
            <Button variant="contained">Start 
            </Button>
          </div>
          <h2 className="exercise-name">Exercise Name <FavoriteBorderOutlinedIcon/></h2>
          <p className="instrument">Instrument</p>
         
          </Grid>
          <Grid item xs={12} sm={6} >
            
            
            <p>Exercise details go here</p>
            <div className="buttons">
              <Button
                variant="outlined"
                size="small"
                className="play-video"
              >
                Play Video
                <PlayArrowIcon />
              </Button>
              <Button
                variant="outlined"
                size="small">
                Resource Sheet
                <InsertDriveFileIcon />
              </Button>
            </div>
          </Grid>
          <Grid className="tempo-box" item xs={12} sm={6} >
            <p>Metronome box</p>
          </Grid>
          <Grid item xs={12} sm={6}  >
            <h3>Directions:</h3>
            <p>
              <ol>
                <li>Direction one</li>
                <li>Direction two</li>
              </ol>
            </p>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Write a note..."
              multiline
              rows={6}
              placeholder="Write a note..." />
          </Grid>
          <Grid item xs={12} sm={6}  >
            <h3>Remember:</h3>
            <p>
              <ol>
                <li>things to remember list</li>
              </ol>
            </p>
          </Grid>
          <Grid item xs={12} sm={6}  textAlign={'right'}>
            <p className="completed">0/6 complete</p>
            <h4 className="end-session">End Session (Exit)</h4>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}

export default SessionPage;
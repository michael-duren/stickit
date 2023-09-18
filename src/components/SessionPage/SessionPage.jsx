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
          <Grid item sm={12} 
          sx= {{display: 'inline-flex', marginBottom: '10px'}}
          justifyContent={"space-between"}
           >
            <Grid item>
              <h2 className="exercise-name">Exercise Name <FavoriteBorderOutlinedIcon /></h2>
              <p className="instrument">Instrument</p>
            </Grid>
            <Grid item className="start-button">
              <Button variant="contained"
               >Start
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} 
          sx={{
            marginBottom: '10px'
          }}>
            <p>Exercise details go here</p>
            <Grid item className="buttons"
            sx={{
              marginTop: '10px'
            }}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginRight: '5px'
                }}
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
            </Grid>
          </Grid>
          <Grid className="tempo-box" item xs={12} sm={6}
            sx={{
              marginBottom: '8px'
            }}
          >
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
          <Grid item xs={12} sm={6} 
          sx={{
            marginBottom: '10px'
          }}>
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
          <Grid item xs={12} sm={6} textAlign={'right'}>
            <p className="completed">0/6 complete</p>
            <h4 className="end-session">End Session (Exit)</h4>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}

export default SessionPage;
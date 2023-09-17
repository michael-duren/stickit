import { useParams } from 'react-router-dom';
import NotFound from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideNav from '../SideNav/SideNav';
import Button from "@mui/material/Button";
import './SessionSelectionPage.css';
import InfoIcon from '@mui/icons-material/Info';
import SyncIcon from '@mui/icons-material/Sync';
import MainButton from '../MainButton/MainButton';

export default function SessionSelectionPage() {
  const { id } = useParams();
  const [type, setType] = useState('Test'); // set type for page
  const [focuses, setFocuses] = useState([]); // set focuses

  if (id > 4 || id < 1) {
    return <NotFound />;
  }

  return (
    <div className="background-primary-grey">
      <Grid className="main-page-padding">
        <Grid container>
          <Grid item md={1} lg={1}>
            <SideNav />
          </Grid>
          <Grid item md={11} lg={11}>
            <div className="main-page-content-container">
              <Grid item lg={5}>
                <h2 className='text-center' >Your smart session:</h2>
                <div className='display-flex items-center justify-center'>
                  <div className="session-container exercise main-button-width justify-around">
                    <div>
                      <InfoIcon className='primary-blue'/>
                    </div>
                    <div className="exercise-info flex flex-col flex-1">
                      <p className="exercise-title">Warmup</p>
                      <p className="exersice-description">Full Strokes</p>
                    </div>
                    <div>
                      <p className="exercise-duration">5 min</p>
                    </div>

                  </div>
                  <div className="sync-icon">
                    <SyncIcon className='primary-blue'/>
                  </div>
                </div>
                <div className="total-time">5 min</div>
                <MainButton type="button">Begin Session</MainButton>
                <div className="button-container">
                  <button className='m-t-xl empty-button primary-blue'>Back</button>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

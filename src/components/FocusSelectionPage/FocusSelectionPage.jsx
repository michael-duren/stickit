import { useParams } from 'react-router-dom';
import NotFound from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import SideNav from '../SideNav/SideNav';
import Button from "@mui/material/Button";
import './FocusSelectionPage.css';

export default function FocusSelectionPage() {
  const { id } = useParams();
  const [type, setType] = useState('Test'); // set type for page
  const [focuses, setFocuses] = useState([]); // set focuses

  if (id > 4 || id < 1) {
    return <NotFound />;
  }

  useEffect(() => {
    switch (+id) {
      case 1:
        setType('Speed & Agility');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 2:
        setType('Creativity & Improvisation');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 3:
        setType('Style & Vocabulary');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
      case 4:
        setType('Precision & Timekeeping');
        setFocuses([
          { id: 1, name: 'Hand Speed' },
          { id: 2, name: 'Foot Speed' },
          { id: 3, name: 'Rudiments' },
        ]);
        break;
    }
  }, []);

  return (
    <div className="background-primary-grey">
      <Grid className="main-page-padding">
        <Grid container>
          <Grid item md={1} lg={1}>
            <SideNav />
          </Grid>
          <Grid item  md={11} lg={11}>
            <div className="main-page-content-container">
              <Grid item  lg={3}>
                <h2 className='text-center'>What specifically would you like to work on for {type}</h2>
                <div className="flex m-b-xl gap-16 flex-col items-center">
                  {focuses.map((focus) => {
                    return (
                      <div key={focus.id}>
                        <Button className="btn-focus-select">{focus.name}</Button>
                      </div>
                    );
                  })}
                </div>
                <Button fullWidth variant="contained" className="btn" type="submit" name="submit" value="Sign In" >Next</Button>
                <div>
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

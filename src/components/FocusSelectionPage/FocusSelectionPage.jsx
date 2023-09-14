import { useParams, useHistory } from 'react-router-dom';
import NotFound from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import SideNav from '../SideNav/SideNav';
import Button from '@mui/material/Button';
import './FocusSelectionPage.css';
import { useSelector } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';

export default function FocusSelectionPage() {
  const { id } = useParams();
  const { types, selectedTypes } = useSelector((store) => store.sessionForm);
  const [focuses, setFocuses] = useState([]); // set focuses
  const dispatch = useDispatch();
  const history = useHistory();

  if (id > 4 || id < 1) {
    return <NotFound />;
  }

  useEffect(() => {
    fetch(`/api/typefocus/${id}`)
      .then((res) => res.json())
      .then((res) => setFocuses(res))
      .catch((e) => console.log(e));
  }, []);

  const toggleFocus = (focus) => {
    console.log('focusId', focus);
    dispatch({
      type: SESSION_FORM_ACTIONS.SET_SELECTED_TYPE_FOCUS,
      payload: { type: id, focus },
    });
  };

  const handleNextOrSubmit = () => {
    if (selectedTypes.length === 0) {
      console.log('SUBMITTING');
    } else {
      const path = `/session/focus/${id}`;
      dispatch({ type: SESSION_FORM_ACTIONS.REMOVE_SELECTED_TYPE, paylod: id });
      history.push(path);
    }
  };

  return (
    <div className="background-primary-grey">
      <Grid className="main-page-padding">
        <Grid container>
          <Grid item md={1} lg={1}>
            <SideNav />
          </Grid>
          <Grid item md={11} lg={11}>
            <div className="main-page-content-container">
              <Grid item lg={3}>
                <h2 className="text-center">
                  What specifically would you like to work on for{' '}
                  {types[+id].name}
                </h2>
                <div className="flex m-b-xl gap-16 flex-col items-center">
                  {focuses &&
                    focuses.map((focus) => {
                      return (
                        <div key={focus.id}>
                          <Button
                            onClick={() => toggleFocus(focus.id)}
                            className="btn-focus-select"
                          >
                            {focus.name}
                          </Button>
                        </div>
                      );
                    })}
                </div>
                <Button
                  onClick={handleNextOrSubmit}
                  fullWidth
                  variant="contained"
                  className="btn"
                  type="submit"
                  name="submit"
                  value="Sign In"
                >
                  Next
                </Button>
                <div>
                  <button className="m-t-xl empty-button primary-blue">
                    Back
                  </button>
                </div>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

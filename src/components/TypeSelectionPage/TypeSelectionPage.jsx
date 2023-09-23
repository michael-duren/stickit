import { useDispatch, useSelector } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { SESSION_FORM_SAGA_ACTIONS } from '../../redux/actions/session-form.saga.actions';

export default function TypeSelectionPage() {
  const dispatch = useDispatch();
  const { selectedTypes } = useSelector((store) => store.sessionForm);
  const history = useHistory();
  const { types } = useSelector((store) => store.sessionForm);

  useEffect(() => {
    dispatch({ type: SESSION_FORM_SAGA_ACTIONS.GET_TYPES }); // get types on intial load
  }, []);

  const selectType = (type) =>
    dispatch({
      type: SESSION_FORM_ACTIONS.SET_SELECTED_TYPE,
      payload: type,
    });

  const routeToNextPage = () => {
    let path = `/session/focus/${selectedTypes[0]}`;
    dispatch({
      type: SESSION_FORM_ACTIONS.REMOVE_SELECTED_TYPE,
      payload: selectedTypes[0],
    });
    history.push(path);
  };

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div>
              <div className="m-b-xl">
                <h2>What would you like to work on today?</h2>
                <p>Select which areas you'd like to focus your practice on.</p>
              </div>
              <div className="grid grid-cols-2 grid-rows-4 gap-16">
                {types.map((type) => {
                  return (
                    <div key={type.id}>
                      <button
                        onClick={() => selectType(type.id)}
                        className="btn"
                      >
                        {type.name}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="m-t-xl">
                <MainButton
                  onClick={routeToNextPage}
                  disabled={selectedTypes.length === 0}
                >
                  Next
                </MainButton>
                {/* <div className="flex main-button-width">
            <button className="m-t-xl empty-button primary-blue">Back</button>
          </div> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

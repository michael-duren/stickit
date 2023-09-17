import { useDispatch, useSelector } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function TypeSelectionPage() {
  const dispatch = useDispatch();
  const { selectedTypes } = useSelector((store) => store.sessionForm);
  const history = useHistory();
  const { types } = useSelector((store) => store.sessionForm);

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
    <div className="main-page-content-container">
      <div className="flex flex-col items-center">
        <div>
          <h2>What would you like to work on today?</h2>
          <p>Select which areas you'd like to focus your practice on.</p>
        </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-16">
          {types.map((type) => {
            return (
              <div key={type.id}>
                <button onClick={() => selectType(type.id)} className="btn">
                  {type.name}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex mt-16 flex-col gap-16 w-full">
          <Button
            fullWidth
            onClick={routeToNextPage}
            disabled={selectedTypes.length === 0}
            variant="contained"
            className="btn"
            type="submit"
            name="submit"
            value="Sign In"
          >
            Next
          </Button>
          <div>
            <button className="m-t-xl empty-button primary-blue">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useParams, useHistory } from 'react-router-dom';
import NotFound from '../NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import './FocusSelectionPage.css';
import { useSelector } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { SESSION_FORM_SAGA_ACTIONS } from '../../redux/actions/session-form.saga.actions';
import MainButton from '../MainButton/MainButton';
import MainLayout from '../../layouts/MainLayout';

export default function FocusSelectionPage() {
  const { id } = useParams();
  const {
    types,
    selectedTypes,
    focusAndTypeChoice,
    typeHistory,
    timeInMinutes,
  } = useSelector((store) => store.sessionForm);
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

  const naviagteBack = () => {
    if (typeHistory.length === 0) {
      history.push('/session/type');
    } else {
      const path = `/session/focus/${typeHistory[typeHistory.length - 1]}`;
      dispatch({
        type: SESSION_FORM_ACTIONS.REMOVE_SELECTED_TYPE_FROM_HISTORY,
        payload: typeHistory[typeHistory.length - 1],
      });
      history.push(path);
    }
  };

  const handleNextOrSubmit = () => {
    if (selectedTypes.length === 0) {
      console.log('SUBMITTING');
      dispatch({
        type: SESSION_FORM_SAGA_ACTIONS.POST_SESSION,
        payload: { focusAndTypeChoice, timeInMinutes },
      });
    } else {
      const path = `/session/focus/${selectedTypes[0]}`;
      console.log(path);
      console.log(id);
      dispatch({
        type: SESSION_FORM_ACTIONS.REMOVE_SELECTED_TYPE,
        payload: Number(id),
      });
      history.push(path);
    }
  };

  return (
    <MainLayout showNav={true} exitButton={true}>
      <div className="w-full items-center flex flex-col gap-16">
        {types[+id - 1] && (
          <h2 className="text-center main-button-width">
            What specifically would you like to work on for{' '}
            {types[+id - 1].name}
          </h2>
        )}
        <div className="flex m-b-xl gap-16 flex-col items-center">
          {focuses &&
            focuses.map((focus) => {
              const isSelected = focusAndTypeChoice[id].includes(focus.id);
              return (
                <div key={focus.id}>
                  <button
                    onClick={() => toggleFocus(focus.id)}
                    className={`flex transition-all items-center justify-between duration-300 btn-focus-select ${
                      isSelected && 'btn-focus-select-active '
                    }`}
                  >
                    <div>{focus.name}</div>
                    <div
                      className={`btn-focus-select-check ${
                        isSelected ? 'visible' : 'invisible'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM21.707 12.707L14.147 20.267C13.959 20.455 13.705 20.56 13.44 20.56C13.175 20.56 12.92 20.455 12.733 20.267L9.28 16.814C8.889 16.423 8.889 15.791 9.28 15.4C9.671 15.009 10.303 15.009 10.694 15.4L13.44 18.146L20.293 11.293C20.684 10.902 21.316 10.902 21.707 11.293C22.098 11.684 22.098 12.316 21.707 12.707Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              );
            })}
        </div>
        <div className="flex gap-16 w-full justify-center">
          {focuses.map((focus) => {
            return (
              <div key={focus.id}>
                {focusAndTypeChoice[id].includes(focus.id) && (
                  <p>{focus.name}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-16">
          <MainButton onClick={handleNextOrSubmit} type="button">
            Next
          </MainButton>
          <div className="flex main-button-width">
            <button
              onClick={naviagteBack}
              className="m-t-xl empty-button primary-blue"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

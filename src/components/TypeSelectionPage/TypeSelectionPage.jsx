import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SESSION_FORM_ACTIONS } from '../../redux/actions/session-form.reducer.actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MainLayout from '../../layouts/MainLayout';
import MainButton from '../MainButton/MainButton';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { SESSION_FORM_SAGA_ACTIONS } from '../../redux/actions/session-form.saga.actions';
import Stepper from '../Stepper/Stepper';
import { ReactComponent as RabbitIcon } from '../../images/rabbitIcon.svg';
import { ReactComponent as TargetIcon } from '../../images/targetIcon.svg';
import { ReactComponent as InnovationIcon } from '../../images/innovationIcon.svg';
import { ReactComponent as AbcIcon } from '../../images/abcIcon.svg';
import TypeButton from '../TypeButton/TypeButton';
import { getType } from '../../utils/getExerciseType';

export default function TypeSelectionPage() {
  const dispatch = useDispatch();
  const { selectedTypes } = useSelector((store) => store.sessionForm);
  const history = useHistory();
  const { types } = useSelector((store) => store.sessionForm);
  const [steps, setSteps] = useState(2);

  useEffect(() => {
    dispatch({ type: SESSION_FORM_SAGA_ACTIONS.GET_TYPES }); // get types on intial load
  }, []);

  useEffect(() => {
    // get the current number of steps
    let tmpSteps = selectedTypes.length + 2;

    if (tmpSteps > 3) {
      setSteps(selectedTypes.length + 2);
    } else {
      // make sure steps is at least 3
      setSteps(3);
    }
  }, [selectedTypes]);

  const selectType = (type) =>
    dispatch({
      type: SESSION_FORM_ACTIONS.SET_SELECTED_TYPE,
      payload: type,
    });

  const routeToNextPage = () => {
    let path = `/session/focus/${selectedTypes[0]}`;
    history.push(path);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Speed & Agility':
        return <RabbitIcon />;
      case 'Creativity & Improvisation':
        return <InnovationIcon />;
      case 'Style & Vocabulary':
        return <AbcIcon />;
      case 'Precision & Timekeeping':
        return <TargetIcon />;
    }
  };

  return (
    <MainLayout showExitButton={true} showNav={true}>
      <Grid>
        <Grid justifyContent={'center'} container>
          <Grid item xs={12} sm={6} md={6} lg={5} xl={3}>
            <div>
              <div className="w-full flex items-center justify-center m-b-xl">
                <Stepper steps={steps} currentStep={1} />
              </div>
              <div className="m-b-xl">
                <h2>What would you like to work on today?</h2>
                <p>Select which areas you'd like to focus your practice on.</p>
              </div>
              <div className="grid grid-cols-2 grid-rows-4 gap-16">
                {types.map((type) => {
                  return (
                    <div className="h-full" key={type.id}>
                      <TypeButton
                        icon={getIcon(type.name)}
                        label={type.name}
                        onClick={() => selectType(type.id)}
                      >
                        {type.name}
                      </TypeButton>
                    </div>
                  );
                })}
              </div>
              <div className="m-t-xl flex gap-16">
                {selectedTypes.map((type) => {
                  return <p>{getType(type)}</p>;
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

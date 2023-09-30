import { useDispatch } from 'react-redux';
import './MyActivityPage.css';
import { useEffect } from 'react';
import { SESSION_HISTORY_SAGA_ACTIONS } from '../../redux/actions/session-history.saga.actions';

export default function MyActivityPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_WEEK });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_MONTH });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_YEAR });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_ALL_SESSIONS });
  }, []);

  return (
    <div>
      {/* TOP CONTAINER */}
      <div>
        <div>
          <h2>This Week</h2>
        </div>
        <div>
          <h2>This Month</h2>
        </div>
        <div>
          <h2>This Year</h2>
        </div>
      </div>
      {/* BOTTOM CONTAINER */}
      <div>
        <h2>All Activity</h2>
      </div>
    </div>
  );
}

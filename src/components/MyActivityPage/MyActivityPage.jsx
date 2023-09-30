import { useDispatch, useSelector } from 'react-redux';
import './MyActivityPage.css';
import { useEffect } from 'react';
import { SESSION_HISTORY_SAGA_ACTIONS } from '../../redux/actions/session-history.saga.actions';
import MainLayout from '../../layouts/MainLayout';

export default function MyActivityPage() {
  const dispatch = useDispatch();
  const { sessionsThisWeek, sessionsThisMonth, sessionsThisYear, allSessions } =
    useSelector((store) => store.sessionHistory);

  useEffect(() => {
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_WEEK });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_MONTH });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_SESSIONS_THIS_YEAR });
    dispatch({ type: SESSION_HISTORY_SAGA_ACTIONS.GET_ALL_SESSIONS });
  }, []);

  return (
    <MainLayout showNav={true}>
      <div>
        {/* TOP CONTAINER */}
        <div className="history-banner-container">
          <div className="history-banner-item">
            <h2>This Week</h2>
            <div>3 hr 30min</div>
          </div>
          <div className="history-banner-item">
            <h2>This Month</h2>
            <div>3 hr 30min</div>
          </div>
          <div className="history-banner-item">
            <h2>This Year</h2>
            <div>3 hr 30min</div>
          </div>
        </div>
        {/* BOTTOM CONTAINER */}
        <div>
          <h2>All Activity</h2>
        </div>
      </div>
    </MainLayout>
  );
}

import { ReactComponent as ChevronDown } from '../../images/chevron-down.svg';
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
        <div className="history-banner-container m-b-xl">
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
        <div className="history-all-container">
          <div className="history-all-item">
            <h2>Saturday, Aug 19</h2>
            <div>
              <p>Smart Routine</p>
              <div className="history-all-item-time">
                <p>30 min</p>
                <button>
                  <ChevronDown />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

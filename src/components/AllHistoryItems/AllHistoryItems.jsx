import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ReactComponent as ChevronDown } from '../../images/chevron-down.svg';
import './AllHistoryItems.css';

export default function AllHistoryItems({ allSessions }) {
  const [uniqueDays, setUniqueDays] = useState([]);

  useEffect(() => {
    if (allSessions.length === 0) return;
    let unique = [];

    for (let session of allSessions) {
      if (!unique.includes(session.completed_at)) {
        unique.push(session.completed_at);
      }
    }

    setUniqueDays(unique);
  }, [allSessions]);

  return (
    <div className="history-all-container">
      {uniqueDays.map((date) => {
        const sessionDate = dayjs(date);
        return (
          <div className="history-all-item">
            <h2>{sessionDate.format('dddd, MMM D')}</h2>
            {allSessions.map((session, i) => {
              if (session.completed_at !== date) return null;
              return (
                <div key={session.id + i}>
                  <p>Smart Routine</p>
                  <div className="history-all-item-time">
                    <p>{session.duration} min</p>
                    <button>
                      <ChevronDown />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

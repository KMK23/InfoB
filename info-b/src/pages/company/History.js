import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../store/slices/historySlice";
import "../../styles/pages/_history.scss";

function History() {
  const dispatch = useDispatch();
  const { history, status } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory({ collectionName: "history", queryOptions: {} }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!history) {
    return null;
  }

  const timelineData = history.company.history;

  return (
    <div className="history">
      <h1 className="history__title">회사연혁</h1>
      <p className="history__subtitle">
        현재 디지털화의 혁신을 완벽하게 실현합니다.
      </p>

      <div className="history__timeline">
        {Object.entries(timelineData).map(([period, events], index) => (
          <div key={index} className="history__period">
            <div className="history__period-header">
              <h2>{period}</h2>
            </div>
            <div className="history__events">
              {events.map((event, eventIndex) => (
                <div key={eventIndex} className="history__event">
                  <div className="history__event-content">{event}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;

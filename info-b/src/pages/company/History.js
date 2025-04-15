import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../store/slices/historySlice";
import "../../styles/pages/_history.scss";

function History() {
  const dispatch = useDispatch();
  const { history, status } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory({ collectionName: "hisory", queryOptions: {} }));
  }, [dispatch]);

  console.log("History data:", history);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!history || !history[0]?.company?.history) {
    return null;
  }

  const historyData = history[0].company.history;

  return (
    <div className="history">
      <h1 className="history__title">{historyData.title}</h1>
      <p className="history__subtitle">{historyData.subtitle}</p>

      <div className="history__timeline">
        {Object.entries(historyData.timeline)
          .reverse()
          .map(([period, data], index) => (
            <div key={index} className="history__period">
              <div className="history__period-header">
                <h2>{period}</h2>
              </div>
              <div className="history__events">
                {data.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="history__event">
                    <div className="history__event-content">
                      {event.content}
                    </div>
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

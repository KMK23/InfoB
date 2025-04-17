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

  if (status === "loading") {
    return (
      <div className="history">
        <div className="history__loading">Loading...</div>
      </div>
    );
  }

  if (
    !history ||
    !history[0] ||
    !history[0].company ||
    !history[0].company.history
  ) {
    return (
      <div className="history">
        <div className="history__empty">연혁 데이터가 없습니다.</div>
      </div>
    );
  }

  const historyData = history[0].company.history;

  return (
    <div className="history">
      <h1 className="history__title">{historyData.title || "회사 연혁"}</h1>
      <p className="history__subtitle">{historyData.subtitle || ""}</p>

      <div className="history__timeline">
        {historyData.timeline &&
          Object.entries(historyData.timeline)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, data], index) => (
              <div key={year} className="history__period">
                <div className="history__period-header">
                  <h2>{year}년</h2>
                </div>
                <div className="history__events">
                  {data.events &&
                    data.events.map((event, eventIndex) => (
                      <div
                        key={`${year}-${eventIndex}`}
                        className="history__event"
                      >
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

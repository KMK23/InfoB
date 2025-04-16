import React from "react";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "../../../styles/components/admin/forms/_historyForm.scss";

const HistoryForm = ({ editData, setEditData }) => {
  if (!editData?.timeline) {
    setEditData({
      ...editData,
      timeline: {},
    });
    return null;
  }

  const years = Object.keys(editData.timeline).sort((a, b) => b - a);

  const handleAddYear = () => {
    const newYear = prompt("추가할 연도를 입력하세요 (예: 2024)");
    if (newYear && /^\d{4}$/.test(newYear)) {
      setEditData({
        ...editData,
        timeline: {
          ...editData.timeline,
          [newYear]: {
            events: [{ content: "" }],
          },
        },
      });
    } else if (newYear) {
      alert("올바른 연도 형식을 입력해주세요 (예: 2024)");
    }
  };

  const handleAddEvent = (year) => {
    const newTimeline = { ...editData.timeline };
    if (!newTimeline[year].events) {
      newTimeline[year].events = [];
    }
    newTimeline[year].events.push({ content: "" });
    setEditData({
      ...editData,
      timeline: newTimeline,
    });
  };

  const handleUpdateEvent = (year, index, value) => {
    const newTimeline = { ...editData.timeline };
    newTimeline[year].events[index].content = value;
    setEditData({
      ...editData,
      timeline: newTimeline,
    });
  };

  const handleDeleteEvent = (year, index) => {
    const newTimeline = { ...editData.timeline };
    newTimeline[year].events = newTimeline[year].events.filter(
      (_, i) => i !== index
    );
    if (newTimeline[year].events.length === 0) {
      delete newTimeline[year];
    }
    setEditData({
      ...editData,
      timeline: newTimeline,
    });
  };

  return (
    <div className="history-form">
      <div className="form-group">
        <div className="header">
          <label>연혁 관리</label>
          <button
            type="button"
            className="add-year-button"
            onClick={handleAddYear}
          >
            연도 추가
          </button>
        </div>
        {years.map((year) => (
          <div key={year} className="year-section">
            <h3>{year}년</h3>
            <div className="events">
              {editData.timeline[year].events.map((event, index) => (
                <div key={index} className="event-item">
                  <input
                    type="text"
                    value={event.content || ""}
                    placeholder="내용을 입력하세요"
                    onChange={(e) =>
                      handleUpdateEvent(year, index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteEvent(year, index)}
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-button"
                onClick={() => handleAddEvent(year)}
              >
                내용 추가
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryForm;

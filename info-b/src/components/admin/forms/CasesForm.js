import React from "react";
import "../../../styles/components/admin/forms/_casesForm.scss";

const CasesForm = ({ editData, setEditData }) => {
  if (!editData?.performanceCases) {
    setEditData({
      ...editData,
      performanceCases: [],
    });
    return null;
  }

  const handleAddCase = () => {
    setEditData({
      ...editData,
      performanceCases: [
        ...editData.performanceCases,
        { title: "", description: "" },
      ],
    });
  };

  return (
    <div className="cases-form">
      <div className="form-group">
        <div className="header">
          <label>수행사례 관리</label>
          <button type="button" className="add-button" onClick={handleAddCase}>
            새 수행사례 추가
          </button>
        </div>
        <div className="cases-list">
          {editData.performanceCases.map((case_, index) => (
            <div key={index} className="case-item">
              <div className="input-group">
                <input
                  type="text"
                  value={case_.title || ""}
                  onChange={(e) => {
                    const newCases = [...editData.performanceCases];
                    newCases[index] = {
                      ...newCases[index],
                      title: e.target.value,
                    };
                    setEditData({
                      ...editData,
                      performanceCases: newCases,
                    });
                  }}
                  placeholder="수행사례 제목"
                />
                <textarea
                  value={case_.description || ""}
                  onChange={(e) => {
                    const newCases = [...editData.performanceCases];
                    newCases[index] = {
                      ...newCases[index],
                      description: e.target.value,
                    };
                    setEditData({
                      ...editData,
                      performanceCases: newCases,
                    });
                  }}
                  placeholder="수행사례 설명"
                />
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    const newCases = editData.performanceCases.filter(
                      (_, i) => i !== index
                    );
                    setEditData({
                      ...editData,
                      performanceCases: newCases,
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasesForm;

import React from "react";
import "../../../styles/components/admin/forms/_recruitmentForm.scss";

const RecruitmentForm = ({ editData, setEditData }) => {
  if (!editData?.recruitmentInfo) {
    setEditData({
      ...editData,
      recruitmentInfo: [],
    });
    return null;
  }

  const handleAddRecruitment = () => {
    setEditData({
      ...editData,
      recruitmentInfo: [
        ...editData.recruitmentInfo,
        { title: "", description: "" },
      ],
    });
  };

  return (
    <div className="recruitment-form">
      <div className="form-group">
        <div className="header">
          <label>채용정보 관리</label>
          <button
            type="button"
            className="add-button"
            onClick={handleAddRecruitment}
          >
            새 채용정보 추가
          </button>
        </div>
        <div className="recruitment-list">
          {editData.recruitmentInfo.map((info, index) => (
            <div key={index} className="recruitment-item">
              <div className="input-group">
                <input
                  type="text"
                  value={info.title || ""}
                  onChange={(e) => {
                    const newRecruitmentInfo = [...editData.recruitmentInfo];
                    newRecruitmentInfo[index] = {
                      ...newRecruitmentInfo[index],
                      title: e.target.value,
                    };
                    setEditData({
                      ...editData,
                      recruitmentInfo: newRecruitmentInfo,
                    });
                  }}
                  placeholder="채용정보 제목"
                />
                <textarea
                  value={info.description || ""}
                  onChange={(e) => {
                    const newRecruitmentInfo = [...editData.recruitmentInfo];
                    newRecruitmentInfo[index] = {
                      ...newRecruitmentInfo[index],
                      description: e.target.value,
                    };
                    setEditData({
                      ...editData,
                      recruitmentInfo: newRecruitmentInfo,
                    });
                  }}
                  placeholder="채용정보 설명"
                />
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => {
                    const newRecruitmentInfo = editData.recruitmentInfo.filter(
                      (_, i) => i !== index
                    );
                    setEditData({
                      ...editData,
                      recruitmentInfo: newRecruitmentInfo,
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

export default RecruitmentForm;

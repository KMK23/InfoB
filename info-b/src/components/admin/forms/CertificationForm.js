import React from "react";
import "../../../styles/components/admin/forms/_certificationForm.scss";

const CertificationForm = ({ editData, setEditData }) => {
  if (!editData?.items) {
    setEditData({
      ...editData,
      title: "",
      subtitle: "",
      items: [],
    });
    return null;
  }

  const handleAddItem = () => {
    const maxId = Math.max(...editData.items.map((item) => item.id || 0), 0);
    const newItem = {
      id: maxId + 1,
      type: "certification",
      title: "",
      image: "",
      description: [""],
    };
    setEditData({
      ...editData,
      items: [newItem, ...editData.items],
    });
  };

  return (
    <div className="certification-form">
      <div className="form-group">
        <div className="header">
          <label>인증 및 특허 관리</label>
          <button type="button" className="add-button" onClick={handleAddItem}>
            새 인증/특허 추가
          </button>
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={editData.title || ""}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            placeholder="인증 및 특허"
          />
        </div>
        <div className="form-group">
          <label>부제목</label>
          <input
            type="text"
            value={editData.subtitle || ""}
            onChange={(e) =>
              setEditData({ ...editData, subtitle: e.target.value })
            }
            placeholder="INFOB의 기술력과 신뢰성을 인정받은 다양한 인증서와 특허입니다"
          />
        </div>
        <div className="items-list">
          {editData.items.map((cert, index) => (
            <div key={cert.id || index} className="certification-item">
              <div className="cert-input-group">
                <div className="input-row">
                  <select
                    value={cert.type || "certification"}
                    onChange={(e) => {
                      const newItems = [...editData.items];
                      newItems[index] = {
                        ...newItems[index],
                        type: e.target.value,
                      };
                      setEditData({ ...editData, items: newItems });
                    }}
                    className="type-select"
                  >
                    <option value="certification">인증서</option>
                    <option value="patent">특허</option>
                  </select>
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    value={cert.title || ""}
                    onChange={(e) => {
                      const newItems = [...editData.items];
                      newItems[index] = {
                        ...newItems[index],
                        title: e.target.value,
                      };
                      setEditData({ ...editData, items: newItems });
                    }}
                    placeholder="인증/특허명"
                  />
                </div>
                <div className="input-row">
                  <input
                    type="text"
                    value={cert.image || ""}
                    onChange={(e) => {
                      const newItems = [...editData.items];
                      newItems[index] = {
                        ...newItems[index],
                        image: e.target.value,
                      };
                      setEditData({ ...editData, items: newItems });
                    }}
                    placeholder="이미지 파일명 (예: certification-001.png)"
                  />
                </div>
              </div>
              <div className="description-list">
                {cert.description?.map((desc, descIndex) => (
                  <div key={descIndex} className="description-item">
                    <input
                      type="text"
                      value={desc || ""}
                      onChange={(e) => {
                        const newItems = [...editData.items];
                        newItems[index] = {
                          ...newItems[index],
                          description: newItems[index].description.map((d, i) =>
                            i === descIndex ? e.target.value : d
                          ),
                        };
                        setEditData({ ...editData, items: newItems });
                      }}
                      placeholder="설명을 입력하세요"
                    />
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        const newItems = [...editData.items];
                        newItems[index] = {
                          ...newItems[index],
                          description: newItems[index].description.filter(
                            (_, i) => i !== descIndex
                          ),
                        };
                        setEditData({ ...editData, items: newItems });
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="btnBox">
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => {
                      const newItems = [...editData.items];
                      if (!newItems[index].description) {
                        newItems[index].description = [];
                      }
                      newItems[index].description.push("");
                      setEditData({ ...editData, items: newItems });
                    }}
                  >
                    설명 추가
                  </button>
                  <button
                    type="button"
                    className="delete-all-button"
                    onClick={() => {
                      const newItems = editData.items.filter(
                        (_, i) => i !== index
                      );
                      setEditData({ ...editData, items: newItems });
                    }}
                  >
                    전체 삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;

import React, { useState } from "react";
import MyEditor from "../pages/community/MyEditor";

const NoticeForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorName: "관리자",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="notice-form">
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <MyEditor
          content={formData.content}
          setContent={handleEditorChange}
          isEditing={true}
        />
      </div>
      <div className="button-group">
        <button type="button" onClick={onClose} className="cancel-button">
          취소
        </button>
        <button type="button" onClick={handleSubmit} className="submit-button">
          등록
        </button>
      </div>
    </div>
  );
};

export default NoticeForm;

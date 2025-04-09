import React, { useState } from "react";
import "../../styles/pages/_contentManagement.scss";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("notice");

  const contents = {
    notice: [
      { id: 1, title: "공지사항 제목 1", date: "2024-04-09", status: "게시중" },
      { id: 2, title: "공지사항 제목 2", date: "2024-04-08", status: "게시중" },
    ],
    inquiry: [
      {
        id: 1,
        title: "문의사항 제목 1",
        date: "2024-04-09",
        status: "답변대기",
      },
      {
        id: 2,
        title: "문의사항 제목 2",
        date: "2024-04-08",
        status: "답변완료",
      },
    ],
    faq: [
      { id: 1, title: "FAQ 제목 1", date: "2024-04-09", status: "게시중" },
      { id: 2, title: "FAQ 제목 2", date: "2024-04-08", status: "게시중" },
    ],
  };

  return (
    <div className="content-management">
      <h2>콘텐츠 관리</h2>
      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === "notice" ? "active" : ""}`}
          onClick={() => setActiveTab("notice")}
        >
          공지사항
        </button>
        <button
          className={`tab-button ${activeTab === "inquiry" ? "active" : ""}`}
          onClick={() => setActiveTab("inquiry")}
        >
          문의사항
        </button>
        <button
          className={`tab-button ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </button>
      </div>
      <div className="content-list">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {contents[activeTab].map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>
                  <button className="edit-button">수정</button>
                  <button className="delete-button">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;

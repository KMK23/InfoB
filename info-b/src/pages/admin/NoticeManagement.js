// src/pages/admin/NoticeManagement.js
import React, { useEffect, useState } from "react";
import "../../styles/pages/_contentManagement.scss";
import {
  deleteNotice,
  fetchNotices,
  addNotice,
} from "../../store/slices/noticesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Board from "../../components/Board";
import NoticeForm from "../../components/NoticeForm";

const NoticeManagement = () => {
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const notices = useSelector((state) => state.notices?.notices);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchNotices({ collectionName: "notices", queryOptions: {} })
        ).unwrap();
      } catch (error) {
        console.error("공지사항 로딩 실패:", error);
      }
    };
    fetchData();
  }, [dispatch, notices]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";

    try {
      let date;
      if (typeof timestamp === "string") {
        date = new Date(timestamp);
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        return "-";
      }

      if (isNaN(date.getTime())) return "-";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "-";
    }
  };

  const handleEdit = (notice) => {
    navigate(`/admin/edit-notice/${notice.docId}`);
  };

  const handleDelete = async (docId) => {
    if (window.confirm("공지사항을 삭제하시겠습니까?")) {
      try {
        await dispatch(
          deleteNotice({ collectionName: "notices", docId })
        ).unwrap();
        alert("공지사항이 삭제되었습니다.");
      } catch (error) {
        console.error("공지사항 삭제 실패:", error);
        alert("공지사항 삭제에 실패했습니다.");
      }
    }
  };

  const handleNewNotice = () => {
    setShowNoticeForm(true);
  };

  const handleSaveNotice = async (formData) => {
    try {
      const newNotice = {
        ...formData,
        createdAt: new Date().toISOString(), // ISO 문자열로 변환
        check: true,
      };

      await dispatch(
        addNotice({ collectionName: "notices", data: newNotice })
      ).unwrap();
      setShowNoticeForm(false);
      alert("공지사항이 등록되었습니다.");
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };
  return (
    <div className="notice-management">
      <div className="management-header">
        <h2>공지사항 관리</h2>
      </div>
      <button className="new-notice-button" onClick={handleNewNotice}>
        새 공지사항 작성
      </button>

      {showNoticeForm ? (
        <div className="notice-form-container">
          <NoticeForm
            onSave={handleSaveNotice}
            onClose={() => setShowNoticeForm(false)}
          />
        </div>
      ) : (
        <div className="content-list">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {notices && notices.length > 0 ? (
                notices.map((notice, index) => (
                  <tr key={notice.docId}>
                    <td>{index + 1}</td>
                    <td>{notice.title}</td>
                    <td>{notice.authorName || "관리자"}</td>
                    <td>{formatDate(notice.createdAt)}</td>
                    <td>
                      <span
                        className={`status ${
                          notice.check ? "active" : "pending"
                        }`}
                      >
                        {notice.check ? "게시중" : "비공개"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(notice)}
                      >
                        수정
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(notice.docId)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    등록된 공지사항이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NoticeManagement;

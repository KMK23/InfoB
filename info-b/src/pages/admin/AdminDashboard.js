import React, { useEffect } from "react";
import "../../styles/pages/_adminDashboard.scss";
import { fetchPosts } from "./../../store/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotices } from "./../../store/slices/noticesSlice";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const AdminDashboard = () => {
  const posts = useSelector((state) => state.posts.posts);
  const notices = useSelector((state) => state.notices.notices);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts({ collectionName: "posts", queryOptions: {} }));
    dispatch(fetchNotices({ collectionName: "notices", queryOptions: {} }));
  }, [dispatch]);

  const handleCardClick = (path, activeTab = "notice") => {
    navigate(path, { state: { activeTab } });
  };

  const getLatestUpdateTime = (items) => {
    if (!items || items.length === 0) return "없음";

    const latestDate = items.reduce((latest, item) => {
      let itemDate;
      if (item.updatedAt) {
        if (typeof item.updatedAt === "string") {
          itemDate = new Date(item.updatedAt);
        } else if (item.updatedAt.seconds) {
          itemDate = new Date(item.updatedAt.seconds * 1000);
        }
      } else if (item.createdAt) {
        if (typeof item.createdAt === "string") {
          itemDate = new Date(item.createdAt);
        } else if (item.createdAt.seconds) {
          itemDate = new Date(item.createdAt.seconds * 1000);
        }
      }

      if (!itemDate || isNaN(itemDate.getTime())) return latest;
      return !latest || itemDate > latest ? itemDate : latest;
    }, null);

    if (!latestDate) return "없음";

    try {
      return formatDistanceToNow(latestDate, { addSuffix: true, locale: ko });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "날짜 계산 오류";
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>대시보드</h2>
      <div className="dashboard-grid">
        <div
          className="dashboard-card notice-card"
          onClick={() => handleCardClick("/admin/contents", "notice")}
        >
          <div className="card-icon">
            <i className="fas fa-bullhorn"></i>
          </div>
          <h3>공지사항</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">총 게시글</span>
              <span className="stat-value">{notices.length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최근 게시</span>
              <span className="stat-value">{getLatestUpdateTime(notices)}</span>
            </div>
          </div>
        </div>

        <div
          className="dashboard-card post-card"
          onClick={() => handleCardClick("/admin/contents", "inquiry")}
        >
          <div className="card-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h3>게시판</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">총 게시글</span>
              <span className="stat-value">{posts.length}개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최근 게시</span>
              <span className="stat-value">{getLatestUpdateTime(posts)}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card inquiry-card">
          <div className="card-icon">
            <i className="fas fa-question-circle"></i>
          </div>
          <h3>문의사항</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">미답변</span>
              <span className="stat-value highlight">5개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">답변완료</span>
              <span className="stat-value">25개</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card faq-card">
          <div className="card-icon">
            <i className="fas fa-book"></i>
          </div>
          <h3>FAQ</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">총 FAQ</span>
              <span className="stat-value">30개</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최근 수정</span>
              <span className="stat-value">1일 전</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card system-card">
          <div className="card-icon">
            <i className="fas fa-server"></i>
          </div>
          <h3>시스템 상태</h3>
          <div className="card-content">
            <div className="stat-item">
              <span className="stat-label">서버 상태</span>
              <span className="stat-value success">정상</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">마지막 백업</span>
              <span className="stat-value">12시간 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

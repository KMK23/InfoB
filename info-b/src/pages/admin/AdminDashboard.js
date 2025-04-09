import React from "react";
import "../../styles/pages/_adminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>대시보드</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>공지사항</h3>
          <div className="card-content">
            <p>총 게시글: 15개</p>
            <p>최근 게시: 3시간 전</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>문의사항</h3>
          <div className="card-content">
            <p>미답변: 5개</p>
            <p>답변완료: 25개</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>FAQ</h3>
          <div className="card-content">
            <p>총 FAQ: 30개</p>
            <p>최근 수정: 1일 전</p>
          </div>
        </div>
        <div className="dashboard-card">
          <h3>시스템 상태</h3>
          <div className="card-content">
            <p>서버 상태: 정상</p>
            <p>마지막 백업: 12시간 전</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/components/_adminLayout.scss";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h1>관리자 페이지</h1>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/admin/dashboard">대시보드</Link>
            </li>
            <li>
              <Link to="/admin/contents">콘텐츠 관리</Link>
            </li>
            <li>
              <Link to="/admin/settings">설정</Link>
            </li>
          </ul>
        </nav>
        <div className="admin-footer">
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

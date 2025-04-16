import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import "../styles/components/_adminLayout.scss";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h1>관리자 페이지</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin/dashboard">대시보드</Link>
            </li>
            <li>
              <Link to="/admin/notices">공지사항 관리</Link>
            </li>
            <li>
              <Link to="/admin/posts">게시판 관리</Link>
            </li>
            <li>
              <Link to="/admin/collection">컬렉션 데이터 관리</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;

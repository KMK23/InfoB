import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NoticeManagement from "./NoticeManagement";
import PostManagement from "./PostManagement";
import CollectionEditor from "./CollectionEditor";
import "../../styles/pages/admin/_admin.scss";

const Admin = () => {
  return (
    <div className="admin">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="notices">공지사항 관리</Link>
          </li>
          <li>
            <Link to="posts">게시판 관리</Link>
          </li>
          <li>
            <Link to="collection">컬렉션 데이터 관리</Link>
          </li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route
            index
            element={<div>관리자 페이지에 오신 것을 환영합니다.</div>}
          />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="posts" element={<PostManagement />} />
          <Route path="collection" element={<CollectionEditor />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;

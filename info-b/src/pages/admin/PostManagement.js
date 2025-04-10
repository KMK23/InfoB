// src/pages/admin/PostManagement.js
import React, { useEffect } from "react";
import "../../styles/pages/_contentManagement.scss";
import { deletePost, fetchPosts } from "../../store/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostManagement = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts({ collectionName: "posts", queryOptions: {} }));
  }, [dispatch]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEdit = (post) => {
    console.log("수정할 게시글:", post);
    navigate(`/admin/edit-post/${post.docId}`);
  };

  const handleDelete = async (docId) => {
    console.log("삭제할 게시글 ID:", docId);
    if (window.confirm("삭제 유무 확인중..")) {
      const resultAction = await dispatch(
        deletePost({ collectionName: "posts", docId })
      );
      if (deletePost.fulfilled.match(resultAction)) {
        console.log("게시글 삭제 완료");
      }
    }
  };

  return (
    <div className="post-management">
      <h2>게시판 관리</h2>
      <div className="content-list">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자/회사</th>
              <th>연락처</th>
              <th>작성일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.docId}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>
                    {post.authorName}
                    <br />
                    <small>{post.companyName}</small>
                  </td>
                  <td>
                    {post.phoneNumber}
                    <br />
                    <small>{post.email}</small>
                  </td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>
                    <span
                      className={`status ${post.check ? "active" : "pending"}`}
                    >
                      {post.check ? "게시중" : "비공개"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(post)}
                    >
                      수정
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(post.docId)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  등록된 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostManagement;

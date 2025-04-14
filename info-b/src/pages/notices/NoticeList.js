import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../../store/slices/noticesSlice";
import "../../styles/components/_noticeList.scss";
import { useNavigate } from "react-router-dom";
import { updateDatas } from "../API/firebase";

const NoticeList = () => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notices.notices);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNotices({ collectionName: "notices", queryOptions: {} }));
  }, [dispatch]);

  // 공개된 공지사항만 필터링
  const publicNotices = notices.filter((notice) => notice.check === true);

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

      return date.toLocaleDateString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "-";
    }
  };

  const handleNoticeClick = async (noticeId) => {
    try {
      const clickedNotice = notices.find((notice) => notice.docId === noticeId);
      if (!clickedNotice) return;

      const currentViews = clickedNotice.views || 0;

      // 조회수 업데이트
      await updateDatas("notices", noticeId, {
        views: currentViews + 1,
      });

      // 상세 페이지로 이동
      navigate(`/notice/detail/${noticeId}`);
      console.log(clickedNotice);
    } catch (error) {
      console.error("조회수 업데이트 실패:", error);
    }
  };
  console.log(notices);
  return (
    <div className="notice-list">
      {/* 게시글 리스트 헤더 */}
      <div className="list-header">
        <div className="col number">
          <p>번호</p>
        </div>
        <div className="col title">
          <p>제목</p>
        </div>
        <div className="col author">
          <p>등록자명</p>
        </div>
        <div className="col date">
          <p>등록일</p>
        </div>
        <div className="col views">
          <p>조회수</p>
        </div>
      </div>

      {/* 게시글이 없을 경우 */}
      {publicNotices.length === 0 ? (
        <div className="no-data">No data.</div>
      ) : (
        // 공지사항 목록 렌더링
        publicNotices.map((notice, index) => (
          <div key={notice.docId} className="list-item">
            <div className="col number">{index + 1}</div>
            <div className="col title">
              <button onClick={() => handleNoticeClick(notice.docId)}>
                {notice.title}
              </button>
            </div>
            <div className="col author">{notice.authorName || "관리자"}</div>
            <div className="col date">{formatDate(notice.createdAt)}</div>
            <div className="col views">{notice.views || 0}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticeList;

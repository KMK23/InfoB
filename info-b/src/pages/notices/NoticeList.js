import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices, updateNotice } from "../../store/slices/noticesSlice";
import "../../styles/components/_noticeList.scss";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination"; // Pagination 컴포넌트 추가

const itemsPerPage = 10; // 한 페이지에 보여줄 공지사항 수
const NoticeList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notices.notices);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [filteredNotices, setFilteredNotices] = useState(notices);
  useEffect(() => {
    dispatch(fetchNotices({ collectionName: "notices", queryOptions: {} }));
  }, [dispatch]);

  // 검색어가 변경될 때마다 공지사항 필터링
  useEffect(() => {
    const filtered = notices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [notices, searchTerm]);
  // 공개된 공지사항만 필터링
  const publicNotices = filteredNotices.filter(
    (notice) => notice.check === true
  );

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

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = publicNotices.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지에 해당하는 데이터

  const pageCount = Math.ceil(publicNotices.length / itemsPerPage); // 총 페이지 수
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage); // 페이지 변경
  };
  const handleNoticeClick = async (noticeId) => {
    try {
      const clickedNotice = notices.find((notice) => notice.docId === noticeId);
      if (!clickedNotice) return;

      const currentViews = clickedNotice.views || 0;

      // 조회수 업데이트를 Redux 액션으로 변경
      await dispatch(
        updateNotice({
          collectionName: "notices",
          docId: noticeId,
          data: { views: currentViews + 1 },
        })
      ).unwrap();

      // 상세 페이지로 이동
      navigate(`/notice/detail/${noticeId}`);
    } catch (error) {
      console.error("조회수 업데이트 실패:", error);
    }
  };

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
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default NoticeList;

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/components/_pagination.scss"; // 스타일 적용 (선택)
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
const itemsPerPage = 10; // 한 페이지당 보여줄 아이템 수

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // 예제 데이터 (1~100까지 숫자 리스트)
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  // 현재 페이지에 맞는 데이터 계산
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // 페이지 변경 시 실행되는 함수
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={<MdOutlineKeyboardArrowLeft />}
        nextLabel={<MdKeyboardArrowRight />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"} // 전체 컨테이너 스타일
        activeClassName={"active"} // 선택된 페이지 스타일
        pageClassName={"page-item"} // 페이지 버튼 스타일
        previousClassName={"prev"} // 이전 버튼 스타일
        nextClassName={"next"} // 다음 버튼 스타일
      />
    </div>
  );
};

export default Pagination;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/components/_search.scss";
// import { selectIdValue } from "./../../node_modules/@reduxjs/toolkit/src/entities/utils";

function Search({ onClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log(e.target.value);
  };
  const handleSearchClick = () => {
    if (onClick) {
      // onClick이 유효한지 확인
      onClick(searchTerm); // 전달받은 onClick 함수 호출
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "") {
      onclick(searchTerm);
    }
  };
  return (
    <div className="search-main">
      <div className="search">
        <input
          placeholder="검색어를 입력해주세요."
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default Search;

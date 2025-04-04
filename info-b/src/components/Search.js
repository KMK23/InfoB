import React from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/components/_search.scss";

function Search(props) {
  return (
    <div className="search-main">
      <div className="search">
        <input placeholder="검색어를 입력해주세요." />
        <button>{<FaSearch />}</button>
      </div>
    </div>
  );
}

export default Search;

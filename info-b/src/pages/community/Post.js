import React from "react";
import "../../styles/pages/_post.scss";
import { FaSearch } from "react-icons/fa";
import Community from "../../components/Community";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

function Post() {
  return (
    <div className="recruitment-post">
      <div>
        <h1>게시판</h1>
      </div>
      <div>
        <Search />
        {/* <div className="post-search">
          <input placeholder="검색어를 입력해주세요." />
          <button>{<FaSearch />}</button>
        </div> */}
      </div>
      <div>
        <Community />
      </div>

      <div>
        <div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Post;

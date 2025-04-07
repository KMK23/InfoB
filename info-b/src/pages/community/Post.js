import React from "react";
import "../../styles/pages/_post.scss";
// import { FaSearch } from "react-icons/fa";
import Community from "../../components/Community";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

function Post() {
  return (
    <div className="recruitment-post">
      <div>
        <h1 className="text-3xl font-semibold">게시판</h1>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Community />
      </div>
      <div>
        <button>문의하기</button>
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

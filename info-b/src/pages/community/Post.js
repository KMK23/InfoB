import React from "react";
import "../../styles/pages/_post.scss";
// import { FaSearch } from "react-icons/fa";
import Community from "../../components/Community";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/community/inquiry");
  };
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
      <div className="flex justify-end">
        <button
          className="bg-[#f6f6f6] py-2 px-4 rounded-md hover:bg-gray-200"
          onClick={handleClick}
        >
          문의하기
        </button>
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

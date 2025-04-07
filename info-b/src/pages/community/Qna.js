import React from "react";
import Community from "../../components/Community";
import "../../styles/pages/_qna.scss";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
function Qna(props) {
  return (
    <div className="recruitment-qna">
      <div>
        <h1 className="font-semibold text-3xl">Q&A</h1>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Community />
      </div>
      <div>
        {" "}
        <Pagination />
      </div>
    </div>
  );
}

export default Qna;

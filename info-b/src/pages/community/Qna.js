import React from "react";
import Community from "../../components/Community";
import "../../styles/pages/_qna.scss";
import Search from "../../components/Search";
function Qna(props) {
  return (
    <div className="recruitment-qna">
      <div>
        <h1>Q&A</h1>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Community />
      </div>
    </div>
  );
}

export default Qna;

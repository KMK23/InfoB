import React from "react";
import Community from "../../components/Community";
import "../../styles/pages/_announcement.scss";
import Search from "../../components/Search";

function Announcement(props) {
  return (
    <div className="recruitment-announcement">
      <div>
        <h1>공지사항</h1>
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

export default Announcement;

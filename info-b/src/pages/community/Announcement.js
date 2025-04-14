import React from "react";
import "../../styles/pages/_announcement.scss";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import NoticeList from "../notices/NoticeList";

function Announcement() {
  return (
    <div className="recruitment-announcement">
      <div>
        <h1 className="text-3xl font-semibold">공지사항</h1>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <NoticeList />
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

export default Announcement;

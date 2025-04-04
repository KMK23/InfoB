import React from "react";
import "../styles/components/_community.scss";
function Community(props) {
  const postDetail = [
    { number: 1, title: "제목1", name: "홍**", date: "2025.04.04", check: 5 },
    {
      number: 2,
      title: "제목2",
      name: "홍**",
      date: "2025.04.03",
      check: 48,
    },
    { number: 3, title: "제목3", name: "홍**", date: "2025.04.05", check: 5 },
    { number: 4, title: "제목4", name: "홍**", date: "2025.04.01", check: 7 },
    { number: 5, title: "제목5", name: "홍**", date: "2025.04.00", check: 5 },
  ];

  return (
    <div className="post-a">
      <div className="post-main">
        {/*전체 */}
        <div className="post-head">
          <div className="number">
            <p>번호</p>
          </div>
          <div className="title">
            <p>제목</p>
          </div>
          <div className="name">
            <p>등록자명</p>
          </div>
          <div className="date">
            <p>등록일</p>
          </div>
          <div className="check">
            <p>조회수</p>
          </div>
        </div>
        {/* <div> */}
        {postDetail.map((item, index) => (
          <div key={index} className="post-center">
            <div className="post-number">{item.number}</div>
            <div className="post-title">{item.title}</div>
            <div className="post-name">{item.name}</div>
            <div className="post-date">{item.date}</div>
            <div className="post-check">{item.check}</div>
          </div>
        ))}

        {/* </div> */}
      </div>
    </div>
  );
}

export default Community;

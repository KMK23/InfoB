import React from "react";
// import "../styles/components/_community.scss";
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
    <div className="">
      <div className="my-6">
        {/*전체 */}
        <div className="flex border border-[#f9f9f9] py-5 bg-gray-100">
          <div className="w-1/12">
            <p className="border-r border-gray-300">번호</p>
          </div>
          <div className="w-6/12">
            <p className="border-r border-gray-300">제목</p>
          </div>
          <div className="w-2/12">
            <p className="border-r border-gray-300">등록자명</p>
          </div>
          <div className="w-2/12">
            <p className="border-r border-gray-300">등록일</p>
          </div>
          <div className="w-1/12">
            <p className="">조회수</p>
          </div>
        </div>
        {/* <div> */}
        {postDetail.map((item, index) => (
          <div key={index} className="flex border-b border-gray-200 py-4">
            <div className="w-1/12">{item.number}</div>
            <div className="w-6/12">{item.title}</div>
            <div className="w-2/12">{item.name}</div>
            <div className="w-2/12">{item.date}</div>
            <div className="w-1/12">{item.check}</div>
          </div>
        ))}

        {/* </div> */}
      </div>
    </div>
  );
}

export default Community;

import React from "react";
import MyEditor from "./MyEditor";

function Inquiry(props) {
  return (
    <div className="mx-36">
      <div>
        <h1 className="text-3xl font-semibold">1:1 문의</h1>
      </div>
      <div className="flex flex-col my-20 p-5">
        <div className="flex">
          <div className="w-1/12 bg-gray-200 border-gray-300 border py-4 text-end pr-2">
            회사명
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border rounded-md w-full py-2 px-4"
              placeholder="회사명"
            />
          </div>
          <div className="w-1/12 bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            작성자명
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border w-full py-2 px-4 rounded-md"
              placeholder="작성자명"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/12 bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            연락처
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border w-full py-2 px-4 rounded-md"
            />
          </div>
          <div className="w-1/12 bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            이메일
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border w-full py-2 px-4 rounded-md"
              placeholder="help@infob.co.kr"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/12  bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            제목
          </div>
          <div className="w-11/12  border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border w-full py-2 px-4 rounded-md"
              placeholder="문의제목"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/12  bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            내용
          </div>
          <div className="w-11/12  border-gray-300 border p-2 h-60">
            {/* <tr /> */}
            <MyEditor />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/12  bg-gray-200 border-gray-300 border py-3 text-end pr-2">
            자동등록방지
          </div>
          <div className="w-11/12  border-gray-300 border p-2 ">
            {/* <tr /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;

import React, { useState } from "react";
import MyEditor from "./MyEditor";
import { FaStar } from "react-icons/fa";

function Inquiry(props) {
  const [editHome, setEditHome] = useState();

  const handlerClick = () => {};

  return (
    <div className="mx-36">
      <div>
        <h1 className="text-3xl font-semibold">1:1 문의</h1>
      </div>
      <div className="flex flex-col my-20 p-5">
        <div className="flex">
          <div className="w-1/12 bg-[#f6f6f6] border-gray-300 border py-4 text-end pr-2">
            회사명
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              className="border-gray-400 border rounded-md w-full py-2 px-4"
              placeholder="회사명"
            />
          </div>
          <div className="w-1/12 bg-[#f6f6f6] border-gray-300 border py-3  pr-2 flex justify-end">
            작성자명
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
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
          <div className="w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-2">
            연락처
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex">
            <input
              type="number"
              className="border-gray-400 border  py-2 px-4 rounded-md w-2/12 appearance-none"
              placeholder="010"
            />
            _
            <input
              type="number"
              className="border-gray-400 border  py-2 px-4 rounded-md w-2/12"
              placeholder="xxxx"
            />
            _
            <input
              type="number"
              className="border-gray-400 border  py-2 px-4 rounded-md w-2/12"
              placeholder="xxxx"
            />
          </div>
          <div className="w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-2">
            이메일
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
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
          <div className="w-1/12  bg-[#f6f6f6] border-gray-300 border py-3 pr-2 flex justify-end">
            제목
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
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
          <div className="w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-2">
            내용
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2 h-[450px]">
            {/* <tr /> */}
            <MyEditor />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/12  bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-2">
            자동등록방지
            <span className="text-[#ff0000] text-xs">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2 ">
            {/* <tr /> */}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="">
            <button
              className="bg-[#ff0000] text-white py-3 px-4 rounded-md hover:bg-red-600"
              onClick={setEditHome}
            >
              취소
            </button>
          </div>
          <div>
            <button className="bg-gray-700 text-white px-4 py-3 rounded-md hover:bg-gray-600">
              문의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;

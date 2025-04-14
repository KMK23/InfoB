import React from "react";
import { useNavigate } from "react-router-dom";

function Find(props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login/login");
  };

  return (
    <div className="mx-52">
      <div className="text-3xl font-bold text-start">아이디/비밀번호 찾기</div>
      <div className="flex justify-center gap-2 mt-10">
        <div className="w-1/2">
          <h1 className="text-start font-bold text-lg">ID 찾기</h1>
          <div className="border-gray-300 border-y flex justify-center items-center py-2">
            <div className="bg text-base font-bold mr-2 w-2/6 ">사용자명</div>
            <div className="w-4/6">
              <input
                type="text"
                className="border border-gray-400 py-2 px-2  rounded-md w-full"
              />
            </div>
          </div>
          <div className="border-gray-300 border-b flex justify-center items-center py-2">
            <div className="bg text-base font-bold mr-2 w-2/6">
              가입시 입력한 이메일
            </div>
            <div className="w-4/6">
              <input
                type="text"
                className="border border-gray-400 py-2 px-2  rounded-md w-full"
              />
            </div>
          </div>
          <div className=" flex justify-end mt-2 ">
            <button className="bg-[#404040] text-white px-4 py-2 rounded-md">
              찾기
            </button>
          </div>
        </div>
        <div className="border-gray-400 border-r-2"></div>
        <div className="w-1/2">
          <h1 className="text-start font-bold text-lg">비밀번호 찾기</h1>
          <div className="border-gray-300 border-y flex justify-center items-center py-2">
            <div className="bg text-base font-bold mr-2 w-2/6">사용자명</div>
            <div className="w-4/6">
              <input
                type="text"
                className="border border-gray-400 py-2 px-2  rounded-md w-full"
              />
            </div>
          </div>
          <div className="border-gray-300 border-b flex justify-center items-center py-2">
            <div className="bg text-base font-bold mr-2 w-2/6">
              가입시 입력한 이메일
            </div>
            <div className="w-4/6">
              <input
                type="text"
                className="border border-gray-400 py-2 px-2  rounded-md w-full"
              />
            </div>
          </div>
          <div className=" flex justify-end mt-2 ">
            <button className="bg-[#404040] text-white px-4 py-2 rounded-md">
              찾기
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={handleBack}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default Find;

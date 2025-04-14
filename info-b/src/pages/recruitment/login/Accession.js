import React from "react";
import { checkAuth } from "./../../../store/slices/authSlice";

function Accession(props) {
  return (
    <div className="mx-52">
      <div>
        <h1 className="text-3xl font-bold text-start">회원가입</h1>
      </div>
      <div className="flex  justify-center flex-col gap-2 border border-gray-300 mt-10 py-4 rounded-md mx-40">
        <div className="flex gap-2 ">
          <div className="font-bold w-1/5">아이디</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full "
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">비밀번호</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">비밀번호 확인</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">이름</div>
          <div className="w-4/5 pr-2">
            <input
              type="text"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">생년월일</div>
          <div className="w-4/5 pr-2">
            <input
              type="date"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
            <p className="text-start">
              생년월일 8자리를 입력해 주세요. ex)19670716
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">성별</div>
          <div className="w-4/5 pr-2"></div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">전화번호</div>
          <div className="w-4/5 pr-2">
            <input
              type="tell"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="font-bold w-1/5">이메일</div>
          <div className="w-4/5 pr-2">
            <input
              type="email"
              className="border border-gray-300 py-2 px-2 rounded-md w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accession;

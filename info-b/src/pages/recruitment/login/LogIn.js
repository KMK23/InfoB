import React from "react";
import img from "../../../resources/images/main/logo_t.png";
import { useNavigate } from "react-router-dom";

function LogIn(props) {
  const navigate = useNavigate();

  const handleFind = () => {
    navigate("/login/find");
  };
  const handleAcc = () => {
    navigate("/login/accession");
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">로그인</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-14">
        <div className="">
          <img src={img} />
        </div>
        <div className="flex flex-col  items-center gap-1">
          <div className="flex mt-10 items-center gap-2 ml-4">
            <div>아이디 :</div>
            <div className="">
              <input
                type="text"
                className="border border-gray-300 py-2 px-3 rounded-md"
              />
            </div>
          </div>
          <div className="flex gap-2 ">
            <div>비밀번호 :</div>
            <div>
              <input
                type="text"
                className="border border-gray-300 py-2 px-3 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-10  items-center w-60">
          <div className="w-full">
            <button className="bg-[#404040] py-2 w-full px-20 text-white text-lg rounded-md hover:bg-black">
              로그인
            </button>
          </div>
          <div className="w-full">
            <button
              className="bg-[#404040] px-2 py-2 w-full text-white text-lg rounded-md hover:bg-black"
              onClick={handleFind}
            >
              아이디/비밀번호 찾기
            </button>
          </div>
          <div className="w-full">
            <button
              className="bg-[#404040] w-full px-20 py-2 text-white text-lg rounded-md hover:bg-black"
              onClick={handleAcc}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getEmailByUsername, getUserRole } from "../../API/firebase"; // Firebase auth 및 역할 함수
import img from "../../../resources/images/main/logo_t.png";
import GoogleLoginButton from "./GoogleLoginButton";

function LogIn(props) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    try {
      let email = emailOrUsername;

      if (!isEmail(emailOrUsername)) {
        const foundEmail = await getEmailByUsername(emailOrUsername);
        if (!foundEmail) {
          alert("아이디 또는 이메일이 존재하지 않습니다.");
          return;
        }
        email = foundEmail;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 성공:", userCredential);

      if (
        userCredential.user.metadata.creationTime ===
        userCredential.user.metadata.lastSignInTime
      ) {
        alert("임시 비밀번호로 로그인되었습니다. 비밀번호를 변경해주세요.");
      }

      // admin 있으면 admin 페이지로
      if (userCredential.user.email.includes("admin")) {
        console.log("관리자 계정으로 로그인");
        navigate("/admin");
      } else {
        console.log("일반 사용자 계정으로 로그인");
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error.message);
      alert("로그인 실패: " + error.message);
    }
  };

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
          <img src={img} alt="Logo" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex mt-10 items-center gap-2 ml-4">
            <div>아이디 :</div>
            <div className="">
              <input
                type="text"
                className="border border-gray-300 py-2 px-3 rounded-md"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="id 또는 email을 입력해주세요."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>비밀번호 :</div>
            <div>
              <input
                type="password"
                className="border border-gray-300 py-2 px-3 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-10 items-center">
          <div className="flex">
            <div className="mr-2">
              <button
                className="bg-[#404040] py-2 px-20 text-white text-lg rounded-md hover:bg-black"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
            <div className="">
              <button
                className="bg-[#404040] px-2 py-2 w-full text-white text-lg rounded-md hover:bg-black"
                onClick={handleFind}
              >
                아이디/비밀번호 찾기
              </button>
            </div>
          </div>
          <div className="w-full">
            <button
              className="bg-[#404040] w-full px-20 py-2 text-white text-lg rounded-md hover:bg-black"
              onClick={handleAcc}
            >
              회원가입
            </button>
          </div>
          <div className="w-full">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;

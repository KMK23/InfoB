import React, { useState } from "react";
import MyEditor from "./MyEditor";
import { FaStar } from "react-icons/fa";
import Captcha from "./Captcha";
import { useNavigate, useParams } from "react-router-dom";
import { addDatas } from "../API/firebase";

function Inquiry({ mode = "create" }) {
  const [companyName, setCompanyName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({
    first: "",
    second: "",
    third: "",
  });
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [captchaVisible, setCaptchaVisible] = useState(true); // 캡차 visible 상태

  // const navigate = useNavigate();
  const { postId } = useParams(); // 게시글 ID (상세보기, 수정 시 사용)

  const handlePhoneChange = (e, part) => {
    setPhoneNumber((prev) => ({ ...prev, [part]: e.target.value }));
  };
  const handleSubmit = async () => {
    // Firestore에 데이터 추가
    const newPost = {
      companyName,
      authorName,
      phoneNumber: `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`,
      email,
      title,
      content,
      createdAt: new Date(),
      check: false, // 기본적으로 '대기' 상태
    };
    console.log("Submitting post:", newPost); // 추가된 디버깅 로그

    try {
      await addDatas("posts", newPost); // 게시글 추가
      alert("게시글이 등록되었습니다.");
      navigate("/community/post"); //
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/community/post");
  };

  return (
    <div className="mx-48">
      <div>
        <h1 className="text-3xl font-semibold">1:1 문의</h1>
      </div>
      <div className="flex flex-col  py-5">
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            회사명
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex justify-center">
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm "
              placeholder="회사명"
            />
          </div>
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2 flex justify-end items-center">
            작성자명
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex justify-center">
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm py-1"
              placeholder="작성자명"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            연락처
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex text-[14px]">
            <input
              type="text"
              className="border-gray-400 border   pl-2 rounded-sm w-2/12 "
              placeholder="010"
              value={phoneNumber.first}
              onChange={(e) => handlePhoneChange(e, "first")}
            />
            _
            <input
              type="text"
              className="border-gray-400 border   pl-2 rounded-sm w-2/12 "
              placeholder="xxxx"
              value={phoneNumber.second}
              onChange={(e) => handlePhoneChange(e, "second")}
            />
            _
            <input
              type="text"
              className="border-gray-400 border   pl-2 rounded-sm w-2/12 "
              placeholder="xxxx"
              value={phoneNumber.third}
              onChange={(e) => handlePhoneChange(e, "third")}
            />
          </div>
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            이메일
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm py-1"
              placeholder="help@infob.co.kr"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            제목
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm py-1"
              placeholder="문의제목"
            />
          </div>
        </div>
        <div className="flex">
          <div className="text-[14px] font-semibold w-1/12  bg-[#f6f6f6] border-gray-300 border py-3 pr-2 flex justify-end items-center">
            내용
            <span className="text-[#ff0000] text-[8px]">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2 h-[550px]">
            {/* <tr /> */}
            <MyEditor setContent={setContent} />
          </div>
        </div>
        <div className="flex">
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-1">
            자동등록방지
            <span className="text-[#ff0000] text-[8px]">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12  border-gray-300 border  ">
            <Captcha />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="">
            <button
              className="bg-[#ff0000] text-white py-3 px-4 rounded-md hover:bg-red-600"
              onClick={handleClick}
            >
              취소
            </button>
          </div>
          <div>
            <button
              className="bg-gray-700 text-white px-4 py-3 rounded-md hover:bg-gray-600"
              onClick={handleSubmit}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;

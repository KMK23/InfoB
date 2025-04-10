import React, { useState } from "react";
import MyEditor from "./MyEditor";
import { FaStar } from "react-icons/fa";
import Captcha from "./Captcha";
import { useNavigate } from "react-router-dom";
import { addDatas } from "../API/firebase";
import Swal from "sweetalert2"; // Import SweetAlert2

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
  const [content, setContent] = useState(""); // MyEditor 컴포넌트와 연결되는 content 상태
  const [captchaVisible, setCaptchaVisible] = useState(true);

  const navigate = useNavigate();

  const handlePhoneChange = (e, part) => {
    setPhoneNumber((prev) => ({ ...prev, [part]: e.target.value }));
  };

  const handleSubmit = async () => {
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
    if (newPost) {
      alert("빈칸을 입력해주세요.");
    }

    try {
      await addDatas("posts", newPost); // Firestore에 데이터 추가
      Swal.fire({
        title: "게시글이 등록되었습니다.",
        text: "게시글 등록이 완료되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      });
      navigate("/community/post"); // 게시글 등록 후 게시글 목록으로 이동
    } catch (error) {
      Swal.fire({
        title: "게시글 등록 실패",
        text: "게시글 등록에 실패했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  const handleClick = () => {
    navigate("/community/post"); // 취소 버튼 클릭 시 게시글 목록으로 이동
  };

  return (
    <div className="mx-48">
      <div>
        <h1 className="text-3xl font-semibold">1:1 문의</h1>
      </div>
      <div className="flex flex-col py-5">
        {/* 회사명 입력 */}
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border pr-2">
            회사명
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex justify-center">
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm"
              placeholder="회사명"
            />
          </div>
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border pr-2 flex justify-end items-center">
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
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm py-1"
              placeholder="작성자명"
            />
          </div>
        </div>
        {/* 연락처 입력 */}
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border pr-2">
            연락처
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex text-[14px]">
            <input
              value={phoneNumber.first}
              onChange={(e) => handlePhoneChange(e, "first")}
              type="text"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              placeholder="010"
            />
            _
            <input
              value={phoneNumber.second}
              onChange={(e) => handlePhoneChange(e, "second")}
              type="text"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              placeholder="xxxx"
            />
            _
            <input
              value={phoneNumber.third}
              onChange={(e) => handlePhoneChange(e, "third")}
              type="text"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              placeholder="xxxx"
            />
          </div>
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border pr-2">
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
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm py-1"
              placeholder="help@infob.co.kr"
            />
          </div>
        </div>
        {/* 제목 입력 */}
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border pr-2">
            제목
            <span className="text-[#ff0000] text-[8px] mb-3">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12 border-gray-300 border p-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm py-1"
              placeholder="문의제목"
            />
          </div>
        </div>
        {/* 내용 입력 */}
        <div className="flex">
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 pr-2 flex justify-end items-center">
            내용
            <span className="text-[#ff0000] text-[8px]">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12 border-gray-300 border p-2 h-[480px]">
            <MyEditor
              content={content} // content 상태를 MyEditor에 전달
              // setFormDate={setContent} // MyEditor에서 변경된 내용 반영
              setContent={setContent}
              isEditing={true}
            />
          </div>
        </div>
        {/* 자동등록방지 입력 */}
        <div className="flex">
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-1">
            자동등록방지
            <span className="text-[#ff0000] text-[8px]">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12 border-gray-300 border">
            <Captcha />
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex justify-between mt-6">
          <div>
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

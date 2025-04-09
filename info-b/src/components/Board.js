import React, { useEffect, useState } from "react";
import MyEditor from "../pages/community/MyEditor";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PiListDashesBold } from "react-icons/pi";
import {
  addDatas,
  deleteDatas,
  getDatas,
  updateDatas,
} from "../pages/API/firebase";
import { FaStar } from "react-icons/fa";
import Captcha from "../pages/community/Captcha";

function Board() {
  const location = useLocation();
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

  // const handlePhoneChange = (e, part) => {
  //   setPhoneNumber((prev) => ({ ...prev, [part]: e.target.value }));
  // };

  // const handleSubmit = async () => {
  //   const newPost = {
  //     companyName,
  //     authorName,
  //     phoneNumber: `${phoneNumber.first}-${phoneNumber.second}-${phoneNumber.third}`,
  //     email,
  //     title,
  //     content,
  //     createdAt: new Date(),
  //     check: false, // 기본적으로 '대기' 상태
  //   };

  // useEffect(() => {
  //   if (mode === "inquiry") {
  //     setTitle("1:1 문의"); // 문의하기 모드일 때
  //   } else if (mode === "edit") {
  //     setTitle("수정글"); // 수정 모드일 때
  //   } else if (mode === "detail") {
  //     setTitle(formData.title || ""); // 게시글 제목 (상세보기 모드)
  //   }
  // }, [mode, formData]);

  //   try {
  //     await addDatas("posts", newPost); // Firestore에 데이터 추가
  //     alert("게시글이 등록되었습니다.");
  //     navigate("/community/post"); // 게시글 등록 후 게시글 목록으로 이동
  //   } catch (error) {
  //     console.error("게시글 등록 실패:", error);
  //     alert("게시글 등록에 실패했습니다.");
  //   }
  // };

  // const handleClick = () => {
  //   navigate("/community/post"); // 취소 버튼 클릭 시 게시글 목록으로 이동
  // };
  const [formData, setFormDate] = useState({
    companyName: "",
    authorName: "",
    contact: "",
    email: "",
    title: "",
    content: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false); //수정상태관리

  const { id } = useParams(); //URL에서 post ID 가져오기
  const [post, setPost] = useState(null);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getDatas("posts", {
          condition: [["docId", "==", id]],
        });
        const post = data.find((item) => item.docId == id); // 하나의 게시글만 가져옴
        setFormDate(post);
        // setTitle(post.title);
        // setContent(post.content);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  //수정 가능 여부설정
  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState); // 수정 시작
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDate({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    // 전화번호를 "-"을 기준으로 3부분으로 나누기
    const phoneParts = value.split("-");

    // 전화번호가 3부분 이상이 되지 않도록 제한
    if (phoneParts.length <= 3) {
      setFormDate({
        ...formData,
        phoneNumber: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPost = {
        companyName: formData.companyName,
        authorName: formData.authorName,
        contact: formData.phoneNumber || "", // phoneNumber가 없으면 빈 문자열로 처리
        email: formData.email || "", // email 값이 없으면 빈 문자열로 처리
        title: formData.title || "", // title 값이 없으면 빈 문자열로 처리
        content: formData.content || "", // content 값이 없으면 빈 문자열로 처리
        phoneNumber: formData.phoneNumber || "", // phoneNumber가 없으면 빈 문자열로 처리
        updatedAt: new Date(),
      };
      console.log(updatedPost);
      await updateDatas("posts", id, updatedPost); // Firestore에 게시글 업데이트
      alert("게시글이 수정되었습니다.");

      // 수정 후 게시판으로 돌아가기
      navigate(`/community/post`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDatas("posts", id); // 게시글 삭제
      alert("게시글이 삭제되었습니다.");
      navigate("/community/post"); // 게시판 목록으로 돌아가기
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/community/post");
  };

  return (
    <div className="mx-48  mb-20 h-auto ">
      <div className="mb-14">
        <h1 className="text-3xl font-semibold">
          {isEditing ? "수정글" : "상세보기"}
        </h1>
      </div>
      <div className="flex flex-col  py-5">
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            회사명
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex justify-center">
            <input
              type="text"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm "
              placeholder="회사명"
              name="companyName"
              value={formData.companyName}
              onChange={isEditing ? handleChange : null} // 수정 가능 여부 체크
              readOnly={!isEditing}
            />
          </div>
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2 flex justify-end items-center">
            작성자명
            <span className="text-[#ff0000] text-[8px] mb-3"></span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex justify-center">
            <input
              type="text"
              name="authorName"
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm py-1"
              value={formData.authorName}
              onChange={isEditing ? handleChange : null} // 수정 가능 여부 체크
              readOnly={!isEditing}
              placeholder="작성자명"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            연락처
            <span className="text-[#ff0000] text-[8px] mb-3"></span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2 flex text-[14px]">
            <input
              type="text"
              name="contact"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              onChange={isEditing ? handlePhoneChange : null}
              value={formData.phoneNumber.split("-")[0] || ""}
              readOnly={!isEditing} // 수정 가능 여부
            />
            _
            <input
              type="text"
              name="contact"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              onChange={isEditing ? handlePhoneChange : null}
              value={formData.phoneNumber.split("-")[1] || ""}
              placeholder="xxxx"
              readOnly={!isEditing} // 수정 가능 여부
            />
            _
            <input
              type="text"
              name="contact"
              className="border-gray-400 border pl-2 rounded-sm w-2/12"
              onChange={isEditing ? handlePhoneChange : null}
              value={formData.phoneNumber.split("-")[2] || ""}
              placeholder="xxxx"
              readOnly={!isEditing} // 수정 가능 여부
            />
          </div>
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            이메일
            <span className="text-[#ff0000] text-[8px] mb-3"></span>
          </div>
          <div className="w-5/12 border-gray-300 border p-2">
            <input
              type="text"
              name="email"
              className="text-[14px] border-gray-400 border w-full pl-2 rounded-sm py-1"
              value={formData.email}
              onChange={isEditing ? handleChange : null}
              placeholder="help@infob.co.kr"
              readOnly={!isEditing} // 수정 가능 여부
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center justify-end text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border  pr-2">
            제목
            <span className="text-[#ff0000] text-[8px] mb-3"></span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2">
            <input
              type="text"
              name="title"
              className="text-[14px] border-gray-400 border w-full pl-2  rounded-sm py-1"
              placeholder="문의제목"
              value={formData.title}
              onChange={isEditing ? handleChange : null}
              readOnly={!isEditing} // 수정 가능 여부
            />
          </div>
        </div>
        <div className="flex ">
          <div className="text-[14px] font-semibold w-1/12  bg-[#f6f6f6] border-gray-300 border py-3 pr-2 flex justify-end items-center">
            내용
            <span className="text-[#ff0000] text-[8px]"></span>
          </div>
          <div className="w-11/12  border-gray-300 border p-2 h-[420px]">
            {/* <tr /> */}
            <MyEditor
              content={formData.content}
              isEditing={isEditing}
              setFormDate={setFormDate}
            />
          </div>
        </div>
        {/* 자동등록방지 입력 */}
        {/* <div className="flex">
          <div className="text-[14px] font-semibold w-1/12 bg-[#f6f6f6] border-gray-300 border py-3 flex justify-end pr-1">
            자동등록방지
            <span className="text-[#ff0000] text-[8px]">
              <FaStar />
            </span>
          </div>
          <div className="w-11/12 border-gray-300 border">
            <Captcha />
          </div>
        </div> */}
        <div className="flex justify-between mt-6">
          <div className="">
            <button
              className="flex items-center gap-1 bg-[#f6f6f6] px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={handleClick}
            >
              <PiListDashesBold /> <div>목록</div>
            </button>
          </div>
          <div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mr-2"
              onClick={handleDelete}
            >
              삭제
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              onClick={isEditing ? handleUpdate : handleEditClick}
            >
              {isEditing ? "수정완료" : "수정"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatas, updateDatas } from "../pages/API/firebase";
import { FaStar } from "react-icons/fa";
import MyEditor from "../pages/community/MyEditor";

function PostDetail(props) {
  const { id } = useParams(); //URL에서 post ID 가져오기
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getDatas("posts", {
          condition: [["docId", "==", id]],
        });
        const post = data[0]; // 하나의 게시글만 가져옴
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedPost = {
        title,
        content,
        updatedAt: new Date(),
      };
      await updateDatas("posts", id, updatedPost); // Firestore에 게시글 업데이트
      alert("게시글이 수정되었습니다.");
      navigate("/community"); // 수정 후 목록 페이지로 돌아가기
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleClick = () => {
    navigate("/community/post");
  };
  if (!post) {
    return <div>로딩 중...</div>;
  }
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
            />
            _
            <input
              type="text"
              className="border-gray-400 border   pl-2 rounded-sm w-2/12 "
              placeholder="xxxx"
            />
            _
            <input
              type="text"
              className="border-gray-400 border   pl-2 rounded-sm w-2/12 "
              placeholder="xxxx"
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
            <MyEditor />
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
              onClick={handleUpdate}
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

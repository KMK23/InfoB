import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDatas, updateDatas } from "../API/firebase";
import { FaStar } from "react-icons/fa";
import MyEditor from "./MyEditor";
import Board from "../../components/Board";

function PostDetail(props) {
  const { id } = useParams(); //URL에서 post ID 가져오기
  const [post, setPost] = useState(null);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const navigate = useNavigate();
  // console.log(id);
  // console.log(post);
  // console.log(title);
  // console.log(content);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getDatas("posts", {
          condition: [["docId", "==", id]],
        });
        const post = data.find((item) => item.docId == id); // 하나의 게시글만 가져옴
        setPost(post);
        // setTitle(post.title);
        // setContent(post.content);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    fetchPost();
  }, [id]);

  // const handleUpdate = async () => {
  //   try {
  //     const updatedPost = {
  //       title,
  //       content,
  //       updatedAt: new Date(),
  //     };
  //     await updateDatas("posts", id, updatedPost); // Firestore에 게시글 업데이트
  //     alert("게시글이 수정되었습니다.");
  //     navigate("/community"); // 수정 후 목록 페이지로 돌아가기
  //   } catch (error) {
  //     console.error("게시글 수정 실패:", error);
  //     alert("게시글 수정에 실패했습니다.");
  //   }
  // };

  const handleClick = () => {
    navigate("/community/post");
  };
  if (!post) {
    return <div>로딩 중...</div>;
  }
  return (
    <div>
      <Board post={post} />
    </div>
  );
}

export default PostDetail;

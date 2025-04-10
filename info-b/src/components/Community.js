import React, { useEffect, useState } from "react";
import { getDatas, updateDatas } from "../pages/API/firebase";
import { useNavigate } from "react-router-dom";

function Community({ search }) {
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [loading, setLoading] = useState(true); // 로딩
  const navigate = useNavigate(); // navigate 변수 선언

  // 게시글 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryOptions = {
          condition: [],
          orderBys: [{ field: "createdAt", direction: "desc" }],
          limits: 10, // 예시로 10개의 게시글만 가져옴
        };
        const data = await getDatas("posts", queryOptions);
        setPosts(data);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // 게시글 클릭 시 조회수 업데이트 후 상세보기로 이동
  const handlePostClick = async (postId) => {
    try {
      const clickedPost = posts.find((post) => post.docId === postId);
      if (!clickedPost) return;

      const currentViews = clickedPost.views || 0;

      // 조회수 업데이트
      await updateDatas("posts", postId, {
        views: currentViews + 1,
      });

      // 상세 페이지로 이동
      navigate(`/community/inquiry/${postId}`);
    } catch (error) {
      console.error("조회수 업데이트 실패:", error);
    }
  };

  // 검색된 게시글 필터링
  const filteredPosts = posts.filter((post) =>
    (post.title || "").toLowerCase().includes((search || "").toLowerCase())
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="community">
      <div className="my-6">
        {/* 게시글 리스트 헤더 */}
        <div className="flex border border-[#f9f9f9] py-4 bg-gray-100 justify-center items-center">
          <div className="w-1/12">
            <p className="border-r border-gray-300 m-0">번호</p>
          </div>
          <div className="w-6/12">
            <p className="border-r border-gray-300 m-0">제목</p>
          </div>
          <div className="w-2/12">
            <p className="border-r border-gray-300 m-0">등록자명</p>
          </div>
          <div className="w-2/12">
            <p className="border-r border-gray-300 m-0 ">등록일</p>
          </div>
          <div className="w-1/12">
            <p className="m-0">조회수</p>
          </div>
        </div>

        {/* 게시글이 없을 경우 */}
        {filteredPosts.length === 0 ? (
          <div className="flex border-b justify-center text-xl border-gray-200 py-4">
            No data.
          </div>
        ) : (
          // 필터링된 게시글 렌더링
          filteredPosts.map((post, index) => (
            <div
              key={post.docId}
              className="flex border-b border-gray-200 py-4"
            >
              <div className="w-1/12">{index + 1}</div>
              <button
                className="w-6/12 hover:text-blue-600"
                onClick={() => handlePostClick(post.docId)}
              >
                {post.title}
              </button>
              <div className="w-2/12">{post.authorName}</div>
              <div className="w-2/12">
                {new Date(post.createdAt?.toDate()).toLocaleDateString()}
              </div>
              <div className="w-1/12">{post.views || 0}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;

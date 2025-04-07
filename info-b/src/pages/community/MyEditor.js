import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyEditor() {
  const [editorValue, setEditorValue] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const quillRef = useRef();

  const handleChange = (value) => {
    setEditorValue(value);
  };

  const modules = {
    toolbar: [
      // 제목, 서식
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"], // B I S
      ["blockquote", "code-block"], // 인용구, 코드블럭
      ["link", "image"], // 링크, 이미지

      // 리스트 & 체크박스 흉내
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }], // 정렬

      // 구분선은 수동으로 작성해야 함. `<hr />` 직접 넣기
    ],
  };

  return (
    <div className="w-full">
      {/* 탭 버튼 */}
      <div className="flex border-b mb-2">
        <button
          onClick={() => setActiveTab("write")}
          className={`px-4 py-2 ${
            activeTab === "write"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500"
          }`}
        >
          Write
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 ${
            activeTab === "preview"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>

      {/* 에디터 / 프리뷰 */}
      {activeTab === "write" ? (
        <ReactQuill
          ref={quillRef}
          value={editorValue}
          onChange={handleChange}
          theme="snow"
          modules={modules}
          className="h-80"
        />
      ) : (
        <div className="border p-4 min-h-96 prose max-w-none bg-white">
          <div dangerouslySetInnerHTML={{ __html: editorValue }} />
        </div>
      )}
    </div>
  );
}

export default MyEditor;

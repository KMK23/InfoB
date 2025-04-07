import React, { useState } from "react";
import ReactQuill from "react-quill"; // ReactQuill 컴포넌트 임포트
import "react-quill/dist/quill.snow.css"; // Quill 스타일 임포트

function MyEditor() {
  // 에디터의 내용 상태 관리
  const [editorValue, setEditorValue] = useState("");

  // 에디터 내용 변경 시 호출되는 함수
  const handleChange = (value) => {
    setEditorValue(value);
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ align: [] }],
    ],
  };
  return (
    <div>
      <h2>Quill 에디터</h2>
      <ReactQuill
        value={editorValue} // 에디터에 표시할 값
        onChange={handleChange} // 값이 바뀔 때마다 호출
        theme="snow" // 에디터의 테마 (snow, bubble 등)
        modules={modules}
      />
      <div>
        <h3>에디터 내용:</h3>
        <div>{editorValue}</div> {/* 에디터에 입력된 내용 */}
      </div>
    </div>
  );
}

export default MyEditor;

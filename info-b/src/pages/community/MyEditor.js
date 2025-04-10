import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function MyEditor({ value, onChange }) {
  const [activeTab, setActiveTab] = useState("write");
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `notice-images/${Date.now()}_${file.name}`
      );

      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", url);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "strike"],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className="editor-container">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("write")}
          className={`tab-button ${activeTab === "write" ? "active" : ""}`}
        >
          Write
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`tab-button ${activeTab === "preview" ? "active" : ""}`}
        >
          Preview
        </button>
      </div>

      {activeTab === "write" ? (
        <div className="editor-wrapper">
          <ReactQuill
            ref={quillRef}
            value={value}
            onChange={onChange}
            modules={modules}
            theme="snow"
            className="editor"
          />
        </div>
      ) : (
        <div className="preview-content">
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )}
    </div>
  );
}

export default MyEditor;

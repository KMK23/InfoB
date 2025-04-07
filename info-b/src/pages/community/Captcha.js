import React, { useRef, useEffect, useState } from "react";

const Captcha = () => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const generateRandomText = (length = 5) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const newText = generateRandomText();
    setCaptchaText(newText);

    // 배경 초기화
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // 텍스트 스타일 설정
    ctx.font = "bold 30px bold";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";

    // 문자 위치 랜덤으로 약간 변경해서 그리기
    for (let i = 0; i < newText.length; i++) {
      const char = newText[i];
      const x = 10 + i * 25 + Math.random() * 5;
      const y = 25 + Math.random() * 10;
      ctx.fillText(char, x, y);
    }

    // 선 몇 개 그리기 (문자 가리듯이)
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const endX = Math.random() * width;
      const endY = Math.random() * height;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.8 + 0.9})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawCaptcha();
  }, []);

  const refreshCaptcha = () => {
    drawCaptcha();
    setInputValue("");
    setMessage("");
  };

  //   const handleSubmit = () => {
  //     if (inputValue.toLowerCase() === captchaText.toLowerCase()) {
  //       setMessage("✅ 인증 성공!");
  //     } else {
  //       setMessage("❌ 인증 실패. 다시 시도해주세요.");
  //     }
  //   };

  return (
    <div className=" space-y-4 flex gap-2 items-center pl-2 pb-2">
      <div>
        <canvas ref={canvasRef} width={140} height={50} className="" />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div className="">
          <input
            type="text"
            className="border rounded w-28 p-1 "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={refreshCaptcha}
            className="text-blue-500 text-sm underline"
          >
            이미지 새로고침
          </button>
        </div>
      </div>
    </div>
  );
};

export default Captcha;

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Captcha = forwardRef(({ onValidate }, ref) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [inputValue, setInputValue] = useState("");

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

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    ctx.font = "bold 30px bold";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";

    for (let i = 0; i < newText.length; i++) {
      const char = newText[i];
      const x = 10 + i * 25 + Math.random() * 5;
      const y = 25 + Math.random() * 10;
      ctx.fillText(char, x, y);
    }

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.8 + 0.9})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
  };

  const refreshCaptcha = () => {
    drawCaptcha();
    setInputValue("");
    onValidate(false);
  };

  useImperativeHandle(ref, () => ({
    refreshCaptcha,
  }));

  useEffect(() => {
    drawCaptcha();
  }, []);

  useEffect(() => {
    if (inputValue.toLowerCase() === captchaText.toLowerCase()) {
      onValidate(true);
    } else {
      onValidate(false);
    }
  }, [inputValue, captchaText]);

  return (
    <div className="space-y-4 flex gap-2 items-center pl-2 pb-2">
      <canvas ref={canvasRef} width={140} height={50} />
      <input
        type="text"
        className="border rounded w-28 p-1"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={refreshCaptcha}
        className="text-blue-500 text-sm underline"
      >
        이미지 새로고침
      </button>
    </div>
  );
});

export default Captcha;

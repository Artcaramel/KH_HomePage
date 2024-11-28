import { useState, useEffect } from "react";

const useImageToBase64 = (url) => {
  const [base64Image, setBase64Image] = useState("");

  const convertToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // CORS 허용
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL("image/png"); // PNG 형식으로 변환
        resolve(base64);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const base64 = await convertToBase64(url);
        setBase64Image(base64);
      } catch (error) {
        console.error("이미지 변환 오류:", error);
      }
    };

    if (url) {
      fetchImage();
    }
  }, [url]);

  return base64Image;
};

export default useImageToBase64;

import { useState, useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import "../MagnifyingGlass.css";

const MagnifyingGlass = ({ onClose, initialPosition }) => {
  const [mousePosition, setMousePosition] = useState(initialPosition);
  const [isCaptureReady, setIsCaptureReady] = useState(false); // 캡처 완료 여부
  const canvasRef = useRef(null);
  const screenshotCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        setMousePosition({
          x: clientX + scrollX,
          y: clientY + scrollY,
        });

        animationFrameRef.current = null;
      });
    }
  };

  // 확대 렌더링 로직 분리
  const renderMagnification = useCallback(() => {
    if (screenshotCanvasRef.current && canvasRef.current) {
      const magnification = 3; // 확대 배율
      const ctx = canvasRef.current.getContext("2d");

      const sourceSize = 100; // 원본 이미지 크기
      const halfSourceSize = sourceSize / 2;

      const destSize = sourceSize * magnification;

      // DPI 보정
      const dpr = window.devicePixelRatio || 1;

      // screenshotCanvasRef의 경계 박스 가져오기
      const rect = screenshotCanvasRef.current.getBoundingClientRect();

      // 마우스 좌표를 캔버스 내부 좌표로 변환 (DPR 반영)
      const relativeX = (mousePosition.x - rect.left) * dpr;
      const relativeY = (mousePosition.y - rect.top) * dpr;

      // 확대 대상 영역의 좌상단 좌표 계산
      const sx = Math.max(0, relativeX - halfSourceSize);
      const sy = Math.max(0, relativeY - halfSourceSize);

      // 확대 대상 영역이 캔버스 경계를 넘지 않도록 조정
      const maxSx = Math.max(0, screenshotCanvasRef.current.width - sourceSize);
      const maxSy = Math.max(
        0,
        screenshotCanvasRef.current.height - sourceSize
      );

      const clampedSx = Math.min(sx, maxSx);
      const clampedSy = Math.min(sy, maxSy);

      // 캔버스 클리어
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // 확대 그리기
      ctx.drawImage(
        screenshotCanvasRef.current,
        clampedSx,
        clampedSy,
        sourceSize,
        sourceSize,
        0,
        0,
        destSize,
        destSize
      );
    }
  }, [mousePosition]);

  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;

    // 캡처 전에 CSS를 강제로 지정하여 누락 방지
    const body = document.body;
    const originalStyle = body.style.cssText; // 원래 스타일 저장
    body.style.transform = "none"; // transform 속성 제거
    body.style.position = "static"; // 고정 위치 해제

    html2canvas(body, {
      scale: dpr, // DPI 반영
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true, // CSS 스타일 반영
      backgroundColor: "white",
    }).then((canvas) => {
      screenshotCanvasRef.current = canvas;
      // 원래 스타일 복원
      body.style.cssText = originalStyle;
      // 캡처 완료 상태 업데이트
      setIsCaptureReady(true);
    });
  }, []);

  // mousePosition 변경 시 렌더링
  useEffect(() => {
    if (isCaptureReady) {
      renderMagnification();
    }
  }, [mousePosition, isCaptureReady, renderMagnification]);

  return (
    <div
      className="magnifying-glass-overlay"
      onMouseMove={handleMouseMove}
      onClick={onClose}
    >
      <canvas
        ref={canvasRef}
        width="200"
        height="200"
        className={`magnifying-glass-canvas ${isCaptureReady ? "" : "hidden"}`}
        style={{
          top: mousePosition.y - window.scrollY - 100,
          left: mousePosition.x - window.scrollX - 100,
        }}
      />
    </div>
  );
};

export default MagnifyingGlass;

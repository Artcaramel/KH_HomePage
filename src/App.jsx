import Header from "./components/Header";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Dictionary from "./pages/Dictionary";
import Notfound from "./pages/NotFound";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Viewer from "./components/Viewer";
import Quiz from "./pages/Quiz";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import useDiaryStore from "./stores/diary";
import useQuizStore from "./stores/quiz";
import Modal from "react-modal";
import MagnifyingGlass from "./components/MagnifyingGlass";

Modal.setAppElement("#root");

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  const toggleMagnifying = (event) => {
    if (!isMagnifying) {
      // 클릭 위치 계산
      const { clientX, clientY } = event;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      setMagnifierPosition({
        x: clientX + scrollX,
        y: clientY + scrollY,
      });
    }
    setIsMagnifying((prev) => !prev);
  };

  // 각각의 스토어 초기화 함수 가져오기
  const { initialize: initializeDiary } = useDiaryStore();
  const { initialize: initializeQuiz } = useQuizStore();

  useEffect(() => {
    const loadData = async () => {
      // Diary 데이터 로드 및 초기화
      const storedDiaryData = localStorage.getItem("diary");
      if (storedDiaryData) {
        try {
          const parsedDiaryData = JSON.parse(storedDiaryData);
          if (Array.isArray(parsedDiaryData)) {
            initializeDiary(parsedDiaryData);
          }
        } catch (error) {
          console.error("Failed to parse diary data:", error);
        }
      }

      // Quiz 데이터 로드 및 초기화
      const storedQuizData = localStorage.getItem("quiz");
      if (storedQuizData) {
        try {
          const parsedQuizData = JSON.parse(storedQuizData);
          if (Array.isArray(parsedQuizData)) {
            initializeQuiz(parsedQuizData);
          }
        } catch (error) {
          console.error("Failed to parse quiz data:", error);
        }
      }

      setIsLoading(false);
    };

    loadData();
  }, [initializeDiary, initializeQuiz]);

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }
  return (
    <>
      <Header
        isMagnifying={isMagnifying}
        toggleMagnifying={toggleMagnifying} // 클릭 이벤트 전달
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary/:id" element={<Viewer />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/new" element={<New />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      {isMagnifying && (
        <MagnifyingGlass
          onClose={toggleMagnifying}
          initialPosition={magnifierPosition} // 초기 위치 전달
        />
      )}
    </>
  );
}

export default App;

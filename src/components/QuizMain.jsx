import React from "react";
import Modal from "react-modal";
import "../Quiz.css";

import { IoCloseSharp } from "react-icons/io5";
import useDictionaryStore from "../stores/dictionary";
import useQuizStore from "../stores/quiz";
import { useEffect } from "react";
import Button from "./Button";

const QuizMain = ({ isOpen, onRequestClose }) => {
  const { qData, quizData, setQuestionQuery, isLoading, error } =
    useDictionaryStore();
  const {
    currentQuestion,
    userAnswer,
    score,
    resetQuiz,
    checkAnswer,
    updateUserAnswer,
    createRecord,
  } = useQuizStore();

  useEffect(() => {
    if (isOpen) {
      quizData(); // 첫 번째 문제 호출
      resetQuiz(); // 퀴즈 상태 초기화
    }
  }, [isOpen, quizData, resetQuiz]);

  const handleAnswerSubmit = () => {
    const correctAnswer = setQuestionQuery || "";

    const isCorrect = userAnswer.trim() === correctAnswer;

    if (userAnswer.trim() === "") {
      alert("답을 입력해주세요");
      return;
    }

    if (isCorrect) {
      alert("정답입니다!");
    } else {
      alert(`오답입니다! 정답은 "${correctAnswer}" 입니다.`);
    }

    // 다음 문제 진행
    if (currentQuestion >= 10) {
      const totalScore = score + (isCorrect ? 1 : 0);
      alert(`퀴즈 종료! 점수: ${totalScore * 10}점 [${totalScore} / 10]`);

      const nickname = prompt("저장하실 닉네임을 입력해주세요");
      if (nickname) {
        const createDate = new Date().toISOString().split("T")[0];
        createRecord(nickname, totalScore * 10, totalScore, 10, createDate);
      }

      setTimeout(() => {
        onRequestClose(); // 모달 닫기
      }, 0);
    } else {
      checkAnswer(correctAnswer); // 상태 업데이트
      quizData(); // 다음 문제 호출
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <IoCloseSharp onClick={onRequestClose} className="close-button" />
        <div className="pb-[15px]">
          <span className="text-[36px] font-bold">
            {currentQuestion}번 문제
          </span>
        </div>
        <div className="QuizMain-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul>
              {qData?.channel?.item.map((entry, index) => (
                <li key={index}>
                  <div className="flex pb-[20px]">
                    <p> ▶ </p>
                    <p className="flex-1 pl-[10px]">{entry.sense.definition}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {isLoading ? (
          <div></div>
        ) : error ? (
          <div></div>
        ) : (
          <div>
            <div className="flex items-center py-[25px]">
              정답 :
              <input
                value={userAnswer}
                onChange={(e) => updateUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAnswerSubmit();
                  }
                }}
                className="flex-1 border border-gray-500 rounded px-2 py-1 w-full ml-[5px]"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleAnswerSubmit}
                type={"POSITIVE"}
                text={"완료"}
                height={"35px"}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuizMain;

import "../Quiz.css";
import { useState, useEffect } from "react";
import { SiQuizlet } from "react-icons/si";
import { PiExclamationMarkFill } from "react-icons/pi";
import Button from "../components/Button";
import QuizMain from "../components/QuizMain";
import DiaryItem from "../components/DiaryItem";
import useQuizStore from "../stores/quiz";
import Test from "../assets/test.png";

const Quiz = () => {
  const { data, toggleQuizCheck, deleteCheckedQuiz, allDeleteQuiz } =
    useQuizStore();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 20];
  const [quizMainTab] = useState([
    { field: "번호", flex: 1 },
    { field: "아이디", flex: 1 },
    { field: "점수", flex: 1 },
    { field: "정답수", flex: 1 },
    { field: "문제수", flex: 1 },
    { field: "등록일", flex: 1 },
    {
      field: "비고",
      flex: 1,
      cellRenderer: (params) => (
        <div className="no-click-row flex items-center pt-[13px] pl-[10px]">
          <input
            type="checkbox"
            checked={params.data.checked}
            onChange={() => toggleQuizCheck(params.data.번호)}
          />
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const formattedData = data.map((quiz) => ({
      번호: quiz.id,
      아이디: quiz.nickname,
      점수: quiz.score,
      정답수: quiz.success,
      문제수: 10,
      등록일: quiz.createDate,
      checked: quiz.checked,
    }));
    setRowData(formattedData);
  }, [data]);

  return (
    <div className="Quiz-wrapper">
      <div className="Quiz-container text-[48px]">
        <div className="flex items-center justify-center">
          <img
            src={Test}
            alt="Test"
            crossOrigin="anonymous" // CORS 허용
            style={{ width: "200px", height: "auto" }}
          />
          <SiQuizlet className="mr-[25px]" />{" "}
          <span className="font-bold">언어 퀴즈</span>
          <PiExclamationMarkFill className="ml-[25px] text-[68px]" />
        </div>
        <div className="py-[30px] flex justify-center">
          <Button
            type={"POSITIVE"}
            text={"시작하기"}
            height="50px"
            onClick={openModal}
          />
        </div>
        <div className="flex ml-auto gap-[10px]">
          <div className="flex mr-[10px] gap-[10px]">
            <Button
              onClick={() => {
                if (window.confirm("전체 삭제 하시겠습니까?")) {
                  allDeleteQuiz();
                }
              }}
              type={"NEGATIVE"}
              text={"전체 삭제"}
            />
            <Button
              onClick={() => {
                const hasChecked = data.some((item) => item.checked); // checked가 true인 데이터가 있는지 확인
                if (!hasChecked) {
                  alert("삭제하실 데이터를 선택해주세요.");
                  return;
                }
                if (window.confirm("선택 삭제 하시겠습니까?")) {
                  deleteCheckedQuiz();
                }
              }}
              type={"NORMAL"}
              text={"선택 삭제"}
            />
          </div>
        </div>
        <QuizMain isOpen={modalIsOpen} onRequestClose={closeModal} />
        <div>
          <DiaryItem
            rowData={rowData}
            columnDefs={quizMainTab}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;

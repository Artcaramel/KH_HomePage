import { create } from "zustand";

const useQuizStore = create((set) => ({
  data: [],
  idRef: 1,
  checked: false,
  currentQuestion: 1, // 현재 문제 번호
  userAnswer: "", // 사용자 입력값
  score: 0, // 정답 개수
  quizMainTab: [
    { field: "번호", flex: 1 },
    { field: "아이디", flex: 1 },
    { field: "점수", flex: 1 },
    { field: "정답수", flex: 1 },
    { field: "문제수", flex: 1 },
    { field: "등록일", flex: 1 },
    { field: "비고", flex: 1 },
  ],

  initialize: (initialData) => {
    let maxId = 0;
    initialData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });
    set({ data: initialData, idRef: maxId + 1 });
  },
  // 퀴즈 초기화
  resetQuiz: () =>
    set({
      currentQuestion: 1,
      userAnswer: "",
      score: 0,
    }),

  // 정답 확인 및 상태 업데이트
  checkAnswer: (correctAnswer) =>
    set((state) => {
      const isCorrect = state.userAnswer.trim() === correctAnswer; // 정답 여부 확인
      return {
        score: isCorrect ? state.score + 1 : state.score, // 정답일 경우 점수 증가
        currentQuestion: state.currentQuestion + 1, // 다음 문제로 진행
        userAnswer: "", // 입력 초기화
      };
    }),

  // 사용자 입력 업데이트
  updateUserAnswer: (answer) => set({ userAnswer: answer }),

  // 퀴즈 기록
  createRecord: (nickname, score, success, problem, createDate) =>
    set((state) => {
      // 새로운 퀴즈 데이터 추가
      const newRecord = {
        id: state.idRef++,
        nickname,
        score,
        success,
        problem,
        createDate,
        checked: state.checked,
      };

      // 새로 추가된 일기를 state.data에 추가
      const newData = [...state.data, newRecord];
      // 상태를 업데이트하고 localStorage에 저장
      localStorage.setItem("quiz", JSON.stringify(newData));
      console.log("새로운 데이터:", newData);
      return { data: newData, idRef: state.idRef };
    }),

  // 비고 체크
  toggleQuizCheck: (id) =>
    set((state) => {
      const newData = state.data.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      console.log(newData);

      localStorage.setItem("quiz", JSON.stringify(newData));
      return { data: newData };
    }),

  // 체크 삭제
  deleteCheckedQuiz: () =>
    set((state) => {
      const newData = state.data.filter((item) => !item.checked);

      localStorage.setItem("quiz", JSON.stringify(newData));
      return { data: newData, idRef: newData.length === 0 ? 1 : state.idRef };
    }),

  // 전체 삭제
  allDeleteQuiz: () =>
    set((state) => {
      const newData = [];

      localStorage.setItem("quiz", JSON.stringify(newData));
      return { data: newData, idRef: newData.length === 0 ? 1 : state.idRef };
    }),
}));

export default useQuizStore;

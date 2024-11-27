import { create } from "zustand";

const useDiaryStore = create((set) => ({
  data: [], // localStorage에서 데이터 로드
  idRef: 1,
  checked: false,

  // 생성 id 유지하기 위한 로직, 새로고침 후 id++ 그대로 유지 시키기 위함
  initialize: (initialData) => {
    let maxId = 0;
    initialData.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    set({ data: initialData, idRef: maxId + 1 });
  },

  createDiary: (date, type, title, content, createDate) =>
    set((state) => {
      // 새로운 일기 추가
      const newDiary = {
        id: state.idRef++,
        date,
        type,
        title,
        content,
        createDate,
        checked: state.checked,
      };

      // 새로 추가된 일기를 state.data에 추가
      const newData = [...state.data, newDiary];

      // 상태를 업데이트하고 localStorage에 저장
      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData, idRef: state.idRef };
    }),
  updateDiary: (id, date, type, title, content, createDate) =>
    set((state) => {
      const newData = state.data.map((item) =>
        item.id === id ? { id, date, type, title, content, createDate, checked: state.checked } : item
      );
      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData };
    }),

  deleteDiary: (id) =>
    set((state) => {
      const newData = state.data.filter((item) => item.id !== id);
      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData, idRef: newData.length === 0 ? 1 : state.idRef };
    }),

  toggleDiaryCheck: (id) =>
    set((state) => {
      const newData = state.data.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData };
    }),

  deleteCheckedDiary: () =>
    set((state) => {
      const newData = state.data.filter((item) => !item.checked);

      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData, idRef: newData.length === 0 ? 1 : state.idRef };
    }),
  allDeleteDiary: () =>
    set((state) => {
      const newData = [];

      localStorage.setItem("diary", JSON.stringify(newData));
      return { data: newData, idRef: newData.length === 0 ? 1 : state.idRef };
    }),
}));

export default useDiaryStore;

import { create } from "zustand";
import axios from "axios";
import { quizSetData } from "../utils/quizSetData";

const useDictionaryStore = create((set) => ({
  data: null,
  qData: null,
  error: null,
  isLoading: false,
  setQuestionQuery: null,

  clearData: () => set({ data: null }),

  fetchData: async (query) => {
    set({ isLoading: true, error: null });
    try {
      if (query === "") {
        alert("검색어를 입력해주세요");
        set({ isLoading: false, error: null });
        return;
      } else {
        const response = await axios.get(`/api/search`, {
          params: {
            key: "B054E3DF9F84FE2E3E33E9FB1958D250",
            q: query,
            req_type: "json",
            start: 1,
            part: "word",
            sort: "popular",
            advanced: "n",
          },
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
          },
        });

        set({ data: response.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  quizData: async () => {
    set({ isLoading: true, error: null });
    try {
      let response;
      let attempts = 0; // 무한 루프 방지를 위한 시도 횟수 제한
      const randomQuery = quizSetData();

      while (attempts < 5) {
        console.log("Random Query:", randomQuery);

        response = await axios.get(`/api/search`, {
          params: {
            key: "B054E3DF9F84FE2E3E33E9FB1958D250",
            q: randomQuery,
            req_type: "json",
            start: 1,
            part: "word",
            sort: "popular",
            advanced: "n",
          },
        });

        if (
          response.data &&
          response.data.channel &&
          response.data.channel.item &&
          response.data.channel.item.length > 0
        ) {
          break;
        }

        attempts += 1;
      }

      if (
        !response.data ||
        !response.data.channel ||
        !response.data.channel.item ||
        response.data.channel.item.length === 0
      ) {
        throw new Error("유효한 퀴즈 데이터를 찾을 수 없습니다.");
      }

      set({ qData: response.data, setQuestionQuery: randomQuery, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDictionaryStore;

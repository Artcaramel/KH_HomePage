import "../Home.css";
import { useState, useEffect } from "react";
import useDictionaryStore from "../stores/dictionary";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Dictionary = () => {
  const nav = useNavigate();
  const { data, error, isLoading, fetchData, clearData } = useDictionaryStore();
  const [input, setInput] = useState("");

  const quizButton = () => {
    nav("/quiz");
  };

  // /dictionary에서 다른 경로로 이동 시 data 초기화 (언마운트)
  useEffect(() => {
    return () => {
      clearData();
    };
  }, [clearData]);

  return (
    <div className="Dictionary-wrapper">
      <div className="Dictionary-container">
        <div className="Dictionary-header">
          <span className="text-[48px] font-bold">언어 사전 탐색기</span>
        </div>
        <div className="flex justify-between items-center pb-[5px]">
          <Button onClick={quizButton} type={"POSITIVE"} text={"문제 풀기"} height="35px" />
          <span className="flex justify-center flex-1 text-[14px] text-gray-500 mr-[100px]">
            ▶ 궁금하신 언어를 입력해 주세요!
          </span>
        </div>

        <div className="Dictionary-search">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchData(input);
              }
            }}
            className="w-full border border-gray-500 rounded px-2 py-1"
          />
          <Button onClick={() => fetchData(input)} type={"POSITIVE"} text={"검색"} />
        </div>
        <div className="Dictionary-results">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            data &&
            data.channel &&
            (data.channel.total === "0" ? (
              <span>검색된 정보가 없습니다</span>
            ) : (
              data.channel.item &&
              data.channel.item.length > 0 && (
                <ul>
                  {data.channel.item.map((entry, index) => (
                    <li key={index}>
                      <div className="flex pb-[20px]">
                        <span className="text-[16px] font-bold min-w-[200px] max-w-[200px] border-r border-gray-900">
                          {entry.sense.word}
                        </span>
                        <p className="flex-1 pl-[10px]">{entry.sense.definition}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;

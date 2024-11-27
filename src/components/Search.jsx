import { useState } from "react";
import Button from "../components/Button";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    onSearch({
      searchText,
      searchType,
      searchCategory,
      startDate,
      endDate,
    });
  };

  return (
    <div className="flex items-center">
      <section className="flex w-[320px] mr-[10px] items-center">
        <input
          type="date"
          className="border border-gray-500 rounded px-2 py-1 mr-[10px]"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        ~
        <input
          type="date"
          className="border border-gray-500 rounded px-2 py-1 ml-[10px]"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </section>
      <section className="w-[75px]">
        <select
          name="type"
          className="border border-gray-500 rounded px-2 py-1"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="" disabled>
            선택
          </option>
          <option value="일상">일상</option>
          <option value="업무">업무</option>
          <option value="위로">위로</option>
        </select>
      </section>
      <section className="w-[75px]">
        <select
          name="type"
          className="border border-gray-500 rounded px-2 py-1"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="" disabled>
            선택
          </option>
          <option value="제목">제목</option>
          <option value="내용">내용</option>
        </select>
      </section>
      <section>
        <input
          type="text"
          className="border border-gray-500 rounded w-[200px] px-2 py-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </section>
      <section className="ml-[5px]">
        <Button onClick={handleSearch} type={"NORMAL"} text={"검색"} height="35px" />
      </section>
    </div>
  );
};

export default Search;

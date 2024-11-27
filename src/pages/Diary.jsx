import "../Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useDiaryStore from "../stores/diary";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DiaryItem from "../components/DiaryItem";
import Search from "../components/Search";
import { isDateInRange } from "../utils/dateMatch";

const Diary = () => {
  const nav = useNavigate();
  const data = useDiaryStore((state) => state.data);
  const { deleteDiary, toggleDiaryCheck, deleteCheckedDiary, allDeleteDiary } = useDiaryStore();

  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [5, 10, 20];

  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터 상태 추가

  const [colDefs, setColDefs] = useState([
    { field: "번호", flex: 1 },
    { field: "종류", flex: 1 },
    { field: "제목", flex: 1 },
    { field: "내용", flex: 1 },
    { field: "날짜", flex: 1 },
    { field: "등록일", flex: 1 },
    {
      field: "비고",
      flex: 1,
      cellRenderer: (params) => (
        <div className="no-click-row flex items-center gap-[30px] pt-[5px]">
          <FaEdit
            size="30"
            title="수정"
            onClick={(e) => {
              nav(`/edit/${params.data.번호}`);
            }}
          />
          <MdDelete
            size="30"
            title="삭제"
            onClick={(e) => {
              if (window.confirm("삭제 하시겠습니까?")) {
                deleteDiary(params.data.번호);
              }
            }}
          />
          <input type="checkbox" checked={params.data.checked} onChange={() => toggleDiaryCheck(params.data.번호)} />
        </div>
      ),
    },
  ]);

  useEffect(() => {
    // 데이터를 rowData 형식에 맞게 변환
    const formattedData = data.map((diary, index) => ({
      번호: diary.id, // 번호는 인덱스 기반으로 설정
      종류: diary.type,
      제목: diary.title,
      내용: diary.content,
      날짜: diary.date,
      등록일: diary.createDate,
      checked: diary.checked,
    }));
    setRowData(formattedData);
    setFilteredData(formattedData); // 초기 데이터 설정
  }, [data]);

  const handleSearch = (searchParams) => {
    const { searchText, searchType, searchCategory, startDate, endDate } = searchParams;
    console.log(searchParams);

    const filtered = rowData.filter((item) => {
      const categoryMatch = searchCategory ? item.종류 === searchCategory : true;
      const textMatch = searchText ? item[searchType]?.toLowerCase().includes(searchText.toLowerCase()) : true;
      const dateMatch = isDateInRange(item.날짜, startDate, endDate);

      return categoryMatch && textMatch && dateMatch;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="Home-container">
      <span className="font-bold text-[26px]">다이어리</span>

      <div className="flex items-center">
        <div className="flex ml-auto gap-[10px]">
          <div className="flex mr-[30px] gap-[10px]">
            <Button
              onClick={() => {
                if (window.confirm("전체 삭제 하시겠습니까?")) {
                  allDeleteDiary();
                }
              }}
              type={"NEGATIVE"}
              text={"전체 삭제"}
            />
            <Button
              onClick={() => {
                if (window.confirm("선택 삭제 하시겠습니까?")) {
                  deleteCheckedDiary();
                }
              }}
              type={"NORMAL"}
              text={"선택 삭제"}
            />
          </div>
          <Button onClick={() => nav("/new")} type={"POSITIVE"} text={"글쓰기"} />
        </div>
      </div>

      <div>
        <DiaryItem
          rowData={filteredData} // 필터링된 데이터를 전달
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          nav={nav}
          onRowClicked={(event) => {
            if (!event.event.target.closest(".no-click-row")) {
              nav(`/diary/${event.data.번호}`);
            }
          }}
        />
      </div>
      <div className="flex py-[15px] pr-[35px] justify-center">
        <Search onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Diary;

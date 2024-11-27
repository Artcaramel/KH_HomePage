import { useState, useEffect } from "react";
import useDiaryStore from "../stores/diary"
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useDiaryStore((state) => state.data);
  const [diaryItem, setDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 다이어리 입니다.");
      nav("/diary", { replace: true });
    }

    setDiaryItem(currentDiaryItem);
  }, [id, data, nav]);

  return diaryItem;
};

export default useDiary;

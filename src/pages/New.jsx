import { useNavigate } from "react-router-dom";
import useDiaryStore from "../stores/diary";
import Editer from "../components/Editer";

const New = () => {
  const nav = useNavigate();
  const { createDiary } = useDiaryStore();

  const onSubmit = (input) => {
    if (input.date && input.type && input.title && input.content) {
      if (window.confirm("작성하시겠습니까?")) {
        createDiary(
          input.date,
          input.type,
          input.title,
          input.content,
          input.createDate
        );
        nav("/diary", { replace: true });
      }
    } else {
      alert("모든 항목을 입력해 주세요.");
    }
  };

  return (
    <div>
      <Editer title={"새 다이어리 쓰기"} onSubmit={onSubmit} />
    </div>
  );
};

export default New;

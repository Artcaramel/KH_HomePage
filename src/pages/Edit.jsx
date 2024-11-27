import { useNavigate } from "react-router-dom";
import useDiaryStore from "../stores/diary";
import Editer from "../components/Editer";
import { useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { updateDiary } = useDiaryStore();
    const curDiaryItem = useDiary(params.id);

    const onSubmit = (input) => {
        if (input.date && input.type && input.title && input.content) {
            if (window.confirm("수정 하시겠습니까?")) {
                const updatedCreateDate = new Date().toISOString().split("T")[0];
                updateDiary(Number(params.id), input.date, input.type, input.title, input.content, updatedCreateDate);
                nav("/diary", { replace: true });
            }
        } else {
            alert("모든 항목을 입력해 주세요.");
        }
    };

    return (
        <div>
            <Editer initData={curDiaryItem} title={"다이어리 수정하기"} onSubmit={onSubmit} />
        </div>
    );
};

export default Edit;

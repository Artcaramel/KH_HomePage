// Viewer.jsx
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "../Home.css";
import { IoCloseSharp } from "react-icons/io5";

const Viewer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const curDiaryItem = useDiary(params.id);
  const [isOpen, setIsOpen] = useState(false); // 모달 열림/닫힘 상태

  useEffect(() => {
    // 페이지에 접근할 때 모달을 자동으로 열기
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    navigate("/diary");
  };

  if (!curDiaryItem) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="Home-container">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal} // 모달 외부 클릭 시 닫힘
        ariaHideApp={false} // 모달 접근성 설정
        className="Modal"
        overlayClassName="Overlay"
      >
        <IoCloseSharp onClick={closeModal} className="close-button" />
        <div className="modal-content">
          <div className="font-bold text-[26px] pb-[15px]">{curDiaryItem.id}번 다이어리</div>
          <div className="flex justify-between w-[450px] pb-[15px]">
            <div className="py-[10px]">
              <span className="mr-[3px]">날짜 : </span>
              <input
                className="border border-gray-500 rounded px-2 py-1 w-[125px] h-[25px]"
                value={curDiaryItem.date}
                disabled
              />
            </div>
            <div className="py-[10px]">
              <span>종류 : </span>
              <input
                className="border border-gray-500 rounded px-2 py-1 w-[75px] h-[25px]"
                value={curDiaryItem.type}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center pb-[20px] gap-2">
            <span>제목 :</span>
            <input
              className="flex-1 border border-gray-500 rounded px-2 py-1 h-[25px] w-full"
              value={curDiaryItem.title}
              disabled
            />
          </div>
          <div>
            <div className="pb-[5px]">내용</div>
            <textarea
              value={curDiaryItem.content}
              className="flex-1 border border-gray-500 rounded w-full px-2 py-1 resize-none h-[200px]"
              disabled
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Viewer;

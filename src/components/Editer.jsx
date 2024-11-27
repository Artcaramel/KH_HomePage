import '../Home.css'
import Button from './Button'
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';

const Editor = ({ initData, onSubmit, title }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    date: "",   
    type: "",  
    title: "",  
    content: "",
    createDate: new Date().toISOString().split('T')[0],
  });

  // initData가 주어질 경우 상태 초기화
  useEffect(() => {
    if (initData) {
      setInput({
        date: initData.date,
        type: initData.type,
        title: initData.title,
        content: initData.content,
        createDate: initData.createDate,
      });      
    }
  }, [initData]);

  // 입력값 변경 처리
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  // 작성 완료 버튼 클릭 시 부모 컴포넌트로 데이터 전달
  const onClickSubmitButton = () => {
    onSubmit(input); // 입력된 데이터 전달
  };

  return (
    <div className="Editor Home-container">
      <section>
        <span className='font-bold text-[26px]'>{title}</span>
      </section>

      <section className='flex w-[300px] items-center py-[25px]'>
        <span className='font-bold text-[18px] mr-[10px]'>날짜</span>
        <input
          name="date"
          value={input.date}
          onChange={onChangeInput}
          type="date"
          className="border border-gray-500 rounded px-2 py-1"
        />
      </section>

      <section className='flex w-[300px] items-center pb-[25px]'>
        <span className='font-bold text-[18px] mr-[10px]'>종류</span>
        <select
          name="type"
          value={input.type}
          onChange={onChangeInput}
          className="border border-gray-500 rounded px-2 py-1"
        >
          <option value="" disabled>선택</option>
          <option value="일상">일상</option>
          <option value="업무">업무</option>
          <option value="위로">위로</option>
        </select>
      </section>

      <section className='flex items-center pb-[25px]'>
        <span className='font-bold text-[18px] mr-[10px]'>제목</span>
        <input
          name="title"
          type="text"
          value={input.title}
          onChange={onChangeInput}
          className="border border-gray-500 rounded w-[500px] px-2 py-1"
          placeholder="제목을 입력하세요"
          maxLength="25"
        />
      </section>

      <section className="flex items-start pb-[25px]">
        <span className="font-bold text-[18px] mr-[10px]">내용</span>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          className="flex-1 border border-gray-500 rounded w-full px-2 py-1 resize-none h-[200px]"
          placeholder="내용을 입력하세요"
        ></textarea>
      </section>

      <section className="flex items-center">
        <div className="ml-auto flex gap-[10px]">
          <Button onClick={() => nav(-1)} type={"NORMAL"} text={"취소"} />
          <Button onClick={onClickSubmitButton} type={"POSITIVE"} text={"완료"} />
        </div>
      </section>
    </div>
  );
};

export default Editor;
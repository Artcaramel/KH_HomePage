import "../Header.css";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";

const Header = ({ isMagnifying, toggleMagnifying }) => {
  return (
    <header className="Header">
      <div className="flex justify-between px-[20px] w-full">
        <div className="text-[#ffffff] text-[20px] ml-[20px]">
          <Link to="/">KH_HomePage</Link>
        </div>

        <div className="flex items-center space-x-4 px-[20px] text-[#ffffff] gap-[10px]">
          <Button
            type={"NORMAL2"}
            text={"돋보기"}
            onClick={(e) => toggleMagnifying(e)} // App에서 전달받은 toggleMagnifying을 호출
          />
          <Link to="/diary" className="hover:underline">
            Diary
          </Link>
          <Link to="/dictionary" className="hover:underline">
            Dictionary
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

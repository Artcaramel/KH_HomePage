import "../Button.css";

// eslint-disable-next-line react/prop-types
const Button = ({ text, type, onClick, width, height }) => {
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`}
      style={{ width: width || "auto", height: height || "auto" }}
    >
      {text}
    </button>
  );
};

export default Button;

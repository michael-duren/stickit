import './MainButton.css';

export default function MainButton({ children, type, onClick, disabled }) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className="main-button transition-all duration-300"
      >
        {children}
      </button>
    </>
  );
}

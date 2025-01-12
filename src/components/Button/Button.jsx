import "./button.scss";

function Button({ children, classes, action }) {
  return (
    <button onClick={action} className={`btn btn--ui ${classes}`}>
      {children}
    </button>
  );
}

export default Button;

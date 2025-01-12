import "./error.scss";
import Button from "../Button/Button";

function Error({ error, dispatch }) {
  return (
    <div className="error">
      <p className="error__message">
        <span className="error__span">🚫</span>
        {error} <span className="error__span">🚫</span>
      </p>

      <Button action={() => dispatch({ type: "generate" })}>Try Again</Button>
    </div>
  );
}

export default Error;

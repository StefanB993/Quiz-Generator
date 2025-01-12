import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import "./footer.scss";

function Footer({ numQuestions, answer, isLastQuestion, dispatch }) {
  return (
    <footer>
      <Timer numQuestions={numQuestions} dispatch={dispatch} />
      {answer && !isLastQuestion && (
        <Button action={() => dispatch({ type: "next" })}>Next</Button>
      )}

      {answer && isLastQuestion && (
        <Button action={() => dispatch({ type: "finish" })}>Finish</Button>
      )}
    </footer>
  );
}

export default Footer;

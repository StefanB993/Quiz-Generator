import Button from "../Button/Button";
import "./finishScreen.scss";

function FinishScreen({ numQuestions, correctAnswers, dispatch }) {
  return (
    <>
      <p>
        You scored {correctAnswers} / {numQuestions}!
      </p>
      <Button action={() => dispatch({ type: "new" })}>New Quiz</Button>
    </>
  );
}

export default FinishScreen;

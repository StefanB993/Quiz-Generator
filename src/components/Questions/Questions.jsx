import Footer from "../Footer/Footer";
import Options from "../Options/Options";
import "./question.scss";

function Questions({ questionData, answer, index, numQuestions, dispatch }) {
  const question = atob(questionData.question);
  const isLastQuestion = index === numQuestions - 1;

  return (
    <div className="question ">
      <h2 className="question__header">{question}</h2>
      <Options
        questionData={questionData}
        dispatch={dispatch}
        answer={answer}
      />

      <Footer
        answer={answer}
        isLastQuestion={isLastQuestion}
        dispatch={dispatch}
        numQuestions={numQuestions}
      />
    </div>
  );
}
export default Questions;

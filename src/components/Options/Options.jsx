import { useEffect, useState } from "react";

function Options({ questionData, dispatch, answer }) {
  const correct = atob(questionData.correct_answer);
  const incorrect = [...questionData.incorrect_answers].map((el) => atob(el));
  const [schuffled, setSchuffled] = useState([]);

  useEffect(() => {
    const options = [correct, ...incorrect].sort(() => Math.random() - 0.5);
    setSchuffled(options);
  }, [questionData]);

  return (
    <ul className="question__options">
      {schuffled.map((option) => (
        <Option
          key={option}
          answer={answer}
          correct={correct}
          option={option}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
}

function Option({ correct, answer, option, dispatch }) {
  const correctAnswer = answer ? option === correct : false;
  const currentAnswer = atob(answer) === option;
  return (
    <li>
      <button
        disabled={answer !== null}
        onClick={() => dispatch({ type: "answer", payload: btoa(option) })}
        className={`question__option ${
          currentAnswer ? "question__answer" : ""
        } ${correctAnswer ? "question__correct" : ""}`}
      >
        {option}
      </button>
    </li>
  );
}

export default Options;

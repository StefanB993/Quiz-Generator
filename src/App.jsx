import { useReducer } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";
import Questions from "./components/Questions/Questions";
import FinishScreen from "./components/FinishScreen/FinishScreen";

const initalState = {
  questions: [],
  status: "generate",
  currentQuestionIndex: 0,
  score: 0,
  error: "",
  answer: null,
  correctAnswers: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "generate":
      return { ...state, status: "generate" };
    case "loading":
      return { ...state, status: "loading" };
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "error": {
      return { ...state, status: "error", error: action.payload };
    }
    case "answer": {
      return {
        ...state,
        answer: action.payload,
        correctAnswers:
          action.payload ===
          state.questions[state.currentQuestionIndex].correct_answer
            ? state.correctAnswers + 1
            : state.correctAnswers,
      };
    }
    case "next": {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    }

    case "finish": {
      return {
        ...state,
        status: "finish",
      };
    }

    case "new": {
      return {
        ...initalState,
      };
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, questions, currentQuestionIndex, answer, correctAnswers } =
    state;
  const questionData = questions[currentQuestionIndex];
  const numQuestions = questions.length;

  return (
    <div className="app">
      {status === "loading" && <Loader />}
      {status === "generate" && <StartScreen dispatch={dispatch} />}
      {status === "error" && <Error dispatch={dispatch} error={state.error} />}
      {status === "ready" && (
        <Questions
          questionData={questionData}
          dispatch={dispatch}
          answer={answer}
          index={currentQuestionIndex}
          numQuestions={numQuestions}
        />
      )}
      {status === "finish" && (
        <FinishScreen
          numQuestions={numQuestions}
          correctAnswers={correctAnswers}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;

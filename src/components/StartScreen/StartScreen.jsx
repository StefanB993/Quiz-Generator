import Form from "../Form/Form";
import Header from "../Header/Header";

function StartScreen({ dispatch }) {
  return (
    <>
      <Header />
      <Form dispatch={dispatch} />
    </>
  );
}

export default StartScreen;

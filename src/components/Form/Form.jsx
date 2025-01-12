import { useEffect, useState } from "react";
import { DIFFICULTY, API } from "../../config/config";
import Button from "../Button/Button";
import "./form.scss";
import useFetch from "../../hooks/useFetch";

function Form({ dispatch }) {
  const [categories, setCategories] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState(DIFFICULTY[0]);
  const fetchData = useFetch();
  const endpoint = buildEndpoint();

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch(`https://opentdb.com/api_category.php`);
        const data = await res.json();
        setCategories(data.trivia_categories);
        setCategory(data.trivia_categories[0].id);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  function buildEndpoint() {
    let endpoint = `${API}&amount=${numQuestions}`;
    if (category !== 0) {
      endpoint += `&category=${category}`;
    }
    if (difficulty !== "Any Difficulty") {
      endpoint += `&difficulty=${difficulty}`;
    }
    return endpoint;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(
      endpoint,
      (data) => dispatch({ type: "dataReceived", payload: data }),
      (err) => dispatch({ type: "error", payload: err }),
      () => dispatch({ type: "loading" })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Input
        id="numQuestions"
        label="Number of questions:"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
      />
      <Select
        id="category"
        label="Select Category"
        options={categories}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Select
        id="difficulty"
        label="Select Difficulty"
        options={DIFFICULTY}
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />
      <Button action={handleSubmit} type="submit">
        Generate
      </Button>
    </form>
  );
}

function Input({ id, label, value, onChange }) {
  return (
    <div className="form__group">
      <label htmlFor={id}>{label}</label>
      <input
        className="form__input"
        id={id}
        type="number"
        value={value}
        onChange={onChange}
        min={1}
      />
    </div>
  );
}

function Select({ id, label, options, value, onChange }) {
  return (
    <div className="form__group">
      <label htmlFor={id}>{label}</label>
      <select
        className="form__select"
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.id || option} value={option.id || option}>
            {option.name || option.replace(option[0], option[0].toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Form;

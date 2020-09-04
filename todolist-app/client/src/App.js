import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setinputValue] = useState("");

  // 첫 화면에서 DB 내 todo-list 출력
  useEffect(() => {
    axios.get("/api/printTodos").then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  const changeHandler = (event) => {
    setinputValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("/api/inputTodos", { todoTitle: inputValue })
      .then((response) => {
        if (response.data.success) {
          setTodos([...todos, response.data]);
          setinputValue("");
        } else {
          alert("falied to update todos");
        }
      });
  };

  const removeHandler = (event) => {
    event.preventDefault();

    axios.get("/api/removeTodos").then((response) => {
      setTodos([]);
      setinputValue("");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {todos &&
            todos.map((todo, index) => <li key={index}>{todo.todoTitle}</li>)}
          <form className="inputBox" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력란"
              value={inputValue}
              onChange={changeHandler}
            />
            <button type="submit">입력</button>
          </form>
          <form className="removeButton" onSubmit={removeHandler}>
            <button type="submit">모두 삭제</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;

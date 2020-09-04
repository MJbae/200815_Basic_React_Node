import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // 첫 화면에서 DB 내 todo-list 출력
  useEffect(() => {
    axios.get("/api/printTodos").then((response) => {
      setTodos(response.data);
    });
  }, []);
  const [todos, setTodos] = useState([]);
  const [inputValue, setinputValue] = useState("");

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
          console.log(todos);
          setinputValue("");
          console.log(inputValue);
        } else {
          alert("falied to update todos");
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {todos &&
            todos.map((todo, index) => <li key={index}>{todo.todoTitle}</li>)}
          <form className="inputBox" onSubmit={submitHandler}>
            <input type="text" placeholder="입력란" onChange={changeHandler} />
            <button type="submit">입력</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;

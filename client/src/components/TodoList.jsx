import { useState, useEffect } from "react";
import axios from "../utils/axios";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/todos", { title: newTodo });
      const todo = response.data;
      setTodos((prev) => {
        return [todo, ...prev];
      });
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoUpdate = async (todoId, updates) => {
    try {
      const response = await axios.patch(`/api/todos/${todoId}`, updates);
      const updatedTodo = response.data;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleTodoDelete = async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <form className="new-todo-form" onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          required
        />
        <button type="submit">+</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div className="todo-title">{todo.title}</div>
            <div className="todo-actions">
              {!todo.completed && (
                <button className="complete"
                  onClick={() => handleTodoUpdate(todo.id, { completed: true })}
                >
                  Mark Complete
                </button>
              )}
              <button className="delete" onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

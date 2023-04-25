// Importing necessary libraries
import { useState, useEffect } from "react";
import axios from "../Utils/axios";
import Task from "./Task";
import NewTask from "./NewTask";
import { GetAllTodo } from "../Utils/TodoService";
import TotoStatus from "./TodoStatus";

function TodoList() {
  // Setting initial state variables
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("todo");

  const updateList = async () => {
    const todos = await GetAllTodo(status);
    setTodos(todos);
  };

  // Fetching todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await GetAllTodo(status);
      setTodos(todos);
    };

    fetchTodos();
  }, [status]);

  // Function to update todo status
  const handleTodoUpdate = async (todoId, updates) => {
    try {
      const response = await axios.patch(`/api/todos/${todoId}`, updates);
      const updatedTodo = response.data;
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== updatedTodo.id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Function to delete todo
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
      <NewTask onChange={(newTodo) => updateList()}></NewTask>

      {/* To show/hide tasks filtered by their status */}
        <TotoStatus status={status} setStatus={setStatus}></TotoStatus>

      {(!todos || todos.length === 0) && (
        <p className="text-muted">
          Nothing here! Add a new task
        </p>
      )}

      {/* List of todos */}
      <ul className="todo-list list-group">
        {/* Loop through todos */}
        {todos.map((todo, index) => (
          <Task
            key={todo.id}
            todo={todo}
            onCheck={handleTodoUpdate}
            onRemove={handleTodoDelete}
          ></Task>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

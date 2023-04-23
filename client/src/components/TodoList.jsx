// Importing necessary libraries
import { useState, useEffect } from "react";
import axios from "../Utils/axios";
import "./TodoList.css";
import Form from "react-bootstrap/Form";

function TodoList() {
  // Setting initial state variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showComplated, setShowComplated] = useState(false);

  // Fetching todos from backend when showComplated state changes
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `/api/todos/?status=${showComplated ? "all" : "todo"}`
        );
        setTodos(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, [showComplated]);

  // Function to update newTodo state
  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Function to handle form submit to add new todo
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
      <h2>Todo List</h2>
  
      {/* Form for adding new todo */}
      <form className="new-todo-form" onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
  
      {/* Checkbox to show/hide completed tasks */}
      <Form.Check
        type="switch"
        label="Display completed tasks"
        checked={showComplated}
        onChange={() => setShowComplated(!showComplated)}
      />
  
      {/* List of todos */}
      <ul className="todo-list">
        {/* Loop through todos */}
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {/* Display todo title */}
            <div className="todo-title">{todo.title}</div>
  
            {/* Display todo actions (Mark Complete/Todo/Delete) */}
            <div className="todo-actions">
              {/* If todo is completed, display button to mark it as todo */}
              {todo.completed && (
                <button
                  onClick={() =>
                    handleTodoUpdate(todo.id, { completed: false })
                  }
                >
                  Mark Todo
                </button>
              )}
  
              {/* If todo is not completed, display button to mark it as complete */}
              {!todo.completed && (
                <button
                  onClick={() => handleTodoUpdate(todo.id, { completed: true })}
                >
                  Mark Complete
                </button>
              )}
  
              {/* Display button to delete the todo */}
              <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default TodoList;

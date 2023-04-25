import axios from "../Utils/axios";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewTask = ({onChange}) => {
  const [newTodo, setNewTodo] = useState("");

  // Function to handle form submit to add new todo
  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/todos", { title: newTodo });
      const todo = response.data;
      onChange(todo);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to update newTodo state
  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <form className="new-todo-form" onSubmit={handleNewTodoSubmit}>
      {/* Form for adding new todo */}
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleNewTodoChange}
          value={newTodo}
          placeholder="To do ..."
          aria-label="To do ..."
          required
        />
        <Button variant="primary" type="submit" id="button-addon2">
          Add Todo
        </Button>
      </InputGroup>
    </form>
  );
};

export default NewTask;

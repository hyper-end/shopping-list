const Task = ({ todo, onCheck, onRemove }) => {
  return (
    <li
      className="list-group-item"
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        className="form-check-input me-3"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onCheck(todo.id, { completed: !todo.completed })}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button
        style={{ background: "none", border: "none" }}
        onClick={() => onRemove(todo.id)}
      >X</button>
    </li>
  );
};

export default Task;

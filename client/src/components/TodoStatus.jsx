import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const TotoStatus = ({ status, setStatus }) => {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button
        onClick={() => setStatus("todo")}
        variant={status === "todo" ? "primary" : "outline-primary"}
      >
        Todo
      </Button>
      <Button
        onClick={() => setStatus("completed")}
        variant={status === "completed" ? "primary" : "outline-primary"}
      >
        Completed
      </Button>
      <Button
        onClick={() => setStatus("all")}
        variant={status === "all" ? "primary" : "outline-primary"}
      >
        All
      </Button>
    </ButtonGroup>
  );
};

export default TotoStatus;

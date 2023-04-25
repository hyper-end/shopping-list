import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm() {
  // State variables to hold the form input values and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hook to manage navigation to a different page
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to log in the user
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      const { user, token } = response.data;

      // Store the user token and data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      // If there's an error, display an error message
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;

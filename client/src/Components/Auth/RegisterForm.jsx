// Importing necessary libraries

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterForm() {
  // Define a functional component called RegisterForm

  // Define state variables and their setter functions using the useState hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Get the navigate function to programmatically navigate to other routes
  const navigate = useNavigate();

  // Define a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (password !== confirmPassword) {
      // If the password and confirm password fields do not match
      setErrorMessage("Passwords do not match"); // Set an error message
      return; // Abort the submission
    }

    try {
      const response = await axios.post("/api/users/register", {
        // Send a POST request to the server with the username and password data
        username,
        password,
      });

      // Get the user object and token from the response
      const { user, token } = response.data;

      // Store the user object and token in the local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the homepage
      navigate("/");
    } catch (err) {
      // Handle errors
      if (err.response && err.response.status === 409) {
        // If the server returns a conflict error (status code 409)
        setErrorMessage("An account with that username already exists");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <Button variant="primary" type="submit">
        Register
        </Button>
      </Form>

    </div>
  );
}

export default RegisterForm;

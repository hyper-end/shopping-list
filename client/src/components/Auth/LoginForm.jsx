import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Utils/axios";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
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
      const response = await axios.post("/api/users/login", { username, password });
      const { user, token } = response.data;
      
      // Store the user token and data in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

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
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;

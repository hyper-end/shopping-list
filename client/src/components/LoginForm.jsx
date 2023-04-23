import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      console.log(response.data)
      const { user, token } = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate("/home");
    } catch (err) {
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

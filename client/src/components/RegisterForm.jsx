import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import "./RegisterForm.css";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/register", {
        username,
        password,
      });
      const { user, token } = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("An account with that username already exists");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;

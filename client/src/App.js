import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import './App.css';
import config from './utils/config';
import axios from "./utils/axios";
import { UserContext } from './utils/UserContext';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const [user, setUser] = useState({
    username: ''
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token !== null) {
        const data = await axios.get(
          `${config.app.api}api/token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <div className="app-container">
      <UserContext.Provider value={{ user, setUser, loading }}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route exact path="/register" element={<RegisterForm />} />
            <Route
              path="/home"
              element={<TodoList/>}
            />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;



/*import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (user) => {
    setUser(user);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Todo List App</h1>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div className="auth-buttons">
            <LoginForm onLogin={handleLogin} />
            <RegisterForm onRegister={handleRegister} />
          </div>
        )}
      </header>
      {user && <TodoList />}
    </div>
  );
}

export default App;
*/
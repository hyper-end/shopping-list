import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import TodoList from './Components/TodoList';
import './App.css';
import config from './Utils/config';
import axios from "./Utils/axios";
import { UserContext } from './utils/UserContext';

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
        const response = await axios.get(
          `${config.app.api}api/token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
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


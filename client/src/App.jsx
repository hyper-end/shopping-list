import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import TodoList from "./Components/TodoList";
import "./App.css";

import ProtectedRoute from "./Utils/ProtectedRoute";
import Layout from "./Layout";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

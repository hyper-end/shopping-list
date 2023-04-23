// Import the required libraries/modules

import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
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
          {/* The root route renders the Layout component */}
          <Route path="/" element={<Layout />}>
            {/* The default route for the root path is the TodoList component, which is only accessible to authenticated users */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
            {/* The Login and Register routes render their respective components */}
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />} />
          </Route>
          {/* The wildcard route catches any other path that wasn't matched */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Todo from "./components/Todo";
import ViewTodo from "./components/View";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  });

  return (
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/todos" /> : <Register />}
        />
        <Route
          path="login"
          element={
            token ? <Navigate to="/todos" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="todos"
          element={!token ? <Navigate to="/login" /> : <Todo />}
        />
        <Route path="todos/:id/view" element={<ViewTodo />} />
      </Routes>
    </Router>
  );
}

export default App;

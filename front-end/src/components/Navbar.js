import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Navbar({ token }) {
  console.log(token);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="#">
          Todo App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/todos">
                  Todos
                </NavLink>
              </li>
            )}
            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;

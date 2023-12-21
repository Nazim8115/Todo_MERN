import React, { useState } from "react";
import axios from "axios";
const { useNavigate } = require("react-router-dom");

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios.post("http://localhost:8000/api/users/login", data).then((res) => {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    });
    // wait 2 sec
    setTimeout(() => {
      navigate("/todos");
    }, 2000);
  };

  return (
    <>
      <h1 className="text-center m-4">Login page</h1>
      <div className="row mt-5 container justify-content-center">
        <form className="col-6 " onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

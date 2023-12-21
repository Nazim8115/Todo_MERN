import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const API_URL = "http://localhost:8000/api/todos/";
const ADD_TODO_URL = "http://localhost:8000/api/todos/create";
function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");

  const [todoKey, setTodoKey] = useState(0);
  const [todo, setTodo] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null); // New state variable

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // for handle delete

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`, config).then((res) => {
      setTodoKey((prevKey) => prevKey + 1);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      status: status,
    };

    if (editTodoId) {
      // Edit mode: Update the existing todo
      axios.put(`${API_URL}/${editTodoId}`, data, config).then((res) => {
        console.log(res);
        setEditTodoId(null); // Reset edit mode
        setTodoKey((prevKey) => prevKey + 1);
      });
    } else {
      // Add mode: Create a new todo
      axios.post(ADD_TODO_URL, data, config).then((res) => {
        console.log(res);
        setTodoKey((prevKey) => prevKey + 1);
      });
    }

    // Reset the form fields
    setTitle("");
    setDescription("");
    setStatus("Not Started");
  };

  const handleEdit = (id) => {
    axios.get(`${API_URL}/${id}`, config).then((res) => {
      const response = res.data;
      setTitle(response.title);
      setDescription(response.description);
      setStatus(response.status);
      setEditTodoId(id); // Set the edit mode
    });
  };

  useEffect(() => {
    axios.get(API_URL, config).then((res) => {
      const response = res.data.reverse();
      setTodo(response);
    });
  }, [todoKey]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.status}</td>
                  <td>
                    <button type="button" className="btn btn-success me-2">
                      <NavLink
                        to={`/todos/${item._id}/view`}
                        className="text-white"
                      >
                        View
                      </NavLink>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning me-2 edit-button"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* todo creation form */}
        <div className="col-6">
          <form className="px-5 mt-5" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                Title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="status" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              {editTodoId ? "Update Todo" : "Add Todo"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Todo;

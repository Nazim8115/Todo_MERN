import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewTodo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/todos/${id}`,
          config
        );
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  return (
    <div className=" d-flex p-2">
      {todo && (
        <div>
          <div className="card justify-content-center">
            <div className="card-body">
              <h1 className="card-title">Title : {todo.title}</h1>
              <h6 className="card-subtitle mb-2 text-muted"></h6>
              <h5 className="card-text">Description : {todo.description}</h5>
              <h3>Status: {todo.status}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTodo;

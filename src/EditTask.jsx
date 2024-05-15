import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTask();
  }, []);

  async function fetchTask() {
    try {
      const response = await fetch(`https://663c556117145c4d8c35dd18.mockapi.io/Tasks/${id}`);
      const data = await response.json();
      setTask(data.task);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }

  async function saveTask() {
    try {
      await fetch(`https://663c556117145c4d8c35dd18.mockapi.io/Tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task })
      });
      navigate("/"); 
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }

  function handleInputChange(event) {
    setTask(event.target.value);
  }

  return (
    <div className="edit-task">
      <h2>Edit Task</h2>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Enter task"
      />
      <button onClick={saveTask}>Save</button>
    </div>
  );
}

export default EditTask;

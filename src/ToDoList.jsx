import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, useParams, useNavigate } from "react-router-dom";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("https://663c556117145c4d8c35dd18.mockapi.io/Tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      try {
        const response = await fetch("https://663c556117145c4d8c35dd18.mockapi.io/Tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ task: newTask })
        });
        const data = await response.json();
        setTasks([...tasks, data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  }

  async function deleteTask(index) {
    try {
      const taskId = tasks[index].id;
      await fetch(`https://663c556117145c4d8c35dd18.mockapi.io/Tasks/${taskId}`, {
        method: "DELETE"
      });
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function moveTaskUP(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task.task}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => moveTaskUP(index)}>Up</button>
            <button onClick={() => moveTaskDown(index)}>Down</button>
            <Link to={`/edit/${task.id}`}>Edit</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}


export default TodoList;

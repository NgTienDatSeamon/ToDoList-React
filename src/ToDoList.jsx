import React, { useState, useEffect } from "react";


function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  


  

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
      await fetch(`https://663c556117145c4d8c35dd18.mockapi.io/Tasks/:id${taskId}`, {
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

function editTask(index) {
  setEditIndex(index);
  setEditedTask(tasks[index].task); 
}

async function saveEditedTask(index) {
  try {
    const taskId = tasks[index].id;
    await fetch(`https://663c556117145c4d8c35dd18.mockapi.io/Tasks/:id${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: editedTask })
    });
    const updatedTasks = [...tasks];
    updatedTasks[index].task = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask("");
  } catch (error) {
    console.error("Error saving edited task:", error);
  }
}


  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
  {Array.isArray(tasks) && tasks.map((task, index) => (
    <li key={index}>
      {editIndex === index ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button className="save-button" onClick={() => saveEditedTask(index)}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <span className="text">{task.task}</span>
          <button className="edit-button" onClick={() => editTask(index)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => deleteTask(index)}>
            Delete
          </button>
          <button className="move-button" onClick={() => moveTaskUP(index)}>
            UP
          </button>
          <button className="move-button" onClick={() => moveTaskDown(index)}>
            DOWN
          </button>
        </div>
      )}
    </li>
  ))}
</ol>
    </div>
  );
}

export default TodoList;

import React, { useState,useEffect} from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");


  useEffect(() => {
    const initialTasks = Array.from({ length: 5 }, (_, index) => `Task ${index + 1}`);
    setTasks(initialTasks);
    },[]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
    }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
    }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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

  function editTask(index) {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  }

  function saveEditedTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask("");
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
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
            ) : (
              <span className="text">{task}</span>
            )}
            {editIndex === index ? (
              <button
                className="save-button"
                onClick={() => saveEditedTask(index)}
              >
                Save
              </button>
            ) : (
              <button className="edit-button" onClick={() => editTask(index)}>
                Edit
              </button>
            )}
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUP(index)}>
              UP
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              DOWN
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;

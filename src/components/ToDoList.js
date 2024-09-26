import React, { useState, useEffect } from 'react';
import './ToDoList.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, isComplete: false, isEditing: false, category: "General" }]);
      setNewTask("");
    }
  }

  function toggleCompleteTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updatedTasks);
  }

  function editTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  }

  function saveTask(index, newText) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText, isEditing: false } : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleEditChange(event, index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: event.target.value } : task
    );
    setTasks(updatedTasks);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const completedTasks = tasks.filter(task => task.isComplete).length;
  const progress = tasks.length === 0 ? 0 : (completedTasks / tasks.length) * 100;

  return (
    <div className={`to-do-list ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>To-Do List</h1>
      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} className="progress"></div>
      </div>

      {tasks.length === 0 ? (
        <p>No todos available. Add a todo to get started!</p>
      ) : (
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.isEditing ? (
                <>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(event) => handleEditChange(event, index)}
                  />
                  <button onClick={() => saveTask(index, task.text)}>Save</button>
                </>
              ) : (
                <>
                  <span
                    className="text"
                    style={{
                      textDecoration: task.isComplete ? "line-through" : "none"
                    }}
                  >
                    {task.text}
                  </span>
                  <button
                    className="complete-button"
                    onClick={() => toggleCompleteTask(index)}
                    disabled={task.isEditing || task.isComplete}
                  >
                    Complete
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => editTask(index)}
                    disabled={task.isComplete}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                    disabled={task.isEditing}
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ToDoList;

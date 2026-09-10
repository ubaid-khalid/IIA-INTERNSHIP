import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
  };

  return (
    <div className="app-container">
      <h1>Task Tracker Dashboard</h1>
      <TaskForm onAddTask={handleAddTask} />
      
      <div className="task-list">
        <h2>My Tasks ({tasks.length})</h2>
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>Due: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
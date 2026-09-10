import React, { useState } from 'react';
import Header from './components/Header';
import { TaskFilter } from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
  };

  // Filter logic agar mazeed use karni ho
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'Pending') return !task.completed;
    if (currentFilter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <Header />
      <TaskFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;
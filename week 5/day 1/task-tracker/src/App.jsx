import { useState } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import './App.css'; // Agar aap ne CSS file banayi hai toh yahan import kar sakte hain

export function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  // Naya task add karne ka function
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title,
      category: newTaskData.category,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Task delete karne ka function (TaskItem ke liye)
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Task status toggle karne ka function
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true; // 'All' ke liye
  });

  return (
    <div className="app-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onDelete={handleDeleteTask} 
        onToggle={handleToggleTask} 
      />
    </div>
  );
}

export default App;
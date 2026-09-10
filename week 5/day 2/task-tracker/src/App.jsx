import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      ...newTaskData
    };
    setTasks([newTask, ...tasks]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px', background: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}
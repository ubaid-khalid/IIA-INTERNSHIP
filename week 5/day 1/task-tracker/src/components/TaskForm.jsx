import { useState } from 'react';

export function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', category: 'Work' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onAddTask(formData);
    setFormData({ title: '', category: 'Work' });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task name..."
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddTask(formData);
    setFormData({ title: '', priority: 'Medium' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title..."
        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" style={{ padding: '10px 18px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Add
      </button>
    </form>
  );
}
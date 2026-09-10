import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', dueDate: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (values) => {
    const newErrors = {};
    if (!values.title.trim()) {
      newErrors.title = 'Task title lazmi hai.';
    } else if (values.title.length < 3) {
      newErrors.title = 'Title kam az kam 3 characters ka hona chahiye.';
    }
    if (!values.dueDate) {
      newErrors.dueDate = 'Due date select krna lazmi hai.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ title: true, dueDate: true });

    if (Object.keys(validationErrors).length === 0) {
      onAddTask(formData);
      setFormData({ title: '', dueDate: '' });
      setTouched({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.title && errors.title ? 'input-error' : ''}
          placeholder="Enter task title..."
        />
        {touched.title && errors.title && (
          <span className="error-message">{errors.title}</span>
        )}
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.dueDate && errors.dueDate ? 'input-error' : ''}
        />
        {touched.dueDate && errors.dueDate && (
          <span className="error-message">{errors.dueDate}</span>
        )}
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
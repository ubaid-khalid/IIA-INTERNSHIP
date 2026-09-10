import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>Due: {task.dueDate}</p>
    </div>
  );
}

export default TaskItem;
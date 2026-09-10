import React from 'react';

function TaskItem({ task }) {
  return (
    <div className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>Due: {task.dueDate}</p>
      </div>
    </div>
  );
}

export default TaskItem;
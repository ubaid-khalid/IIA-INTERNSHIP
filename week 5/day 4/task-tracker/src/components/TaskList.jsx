import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      <h2>My Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p className="empty-message">NO TASK IS AVAILABLE.</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
}

export default TaskList;
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p style={{ color: '#6b7280', textAlign: 'center' }}>No tasks found.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}
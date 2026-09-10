import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No tasks added yet.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}
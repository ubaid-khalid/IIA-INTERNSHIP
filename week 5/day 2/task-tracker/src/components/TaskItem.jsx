export default function TaskItem({ task, onDelete }) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#fff', border: '1px solid #e0e0e0', marginBottom: '8px', borderRadius: '6px' }}>
      <div>
        <span style={{ fontWeight: 'bold', display: 'block' }}>{task.title}</span>
        <small style={{ color: '#777' }}>Priority: {task.priority}</small>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  );
}
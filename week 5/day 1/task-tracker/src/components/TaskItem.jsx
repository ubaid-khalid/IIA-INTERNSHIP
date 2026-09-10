export function TaskItem({ task, onDelete, onToggle }) {
  // Category ke base par dynamic badge color
  const getBadgeStyle = (cat) => {
    return cat === 'Work' 
      ? { background: '#e0e7ff', color: '#3730a3' } 
      : { background: '#fce7f3', color: '#831843' };
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 20px', 
        background: task.completed ? '#f8fafc' : '#ffffff', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px',
        marginBottom: '12px',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.06)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={{ width: '18px', height: '18px', accentColor: '#6366f1', cursor: 'pointer' }}
        />
        <span 
          style={{ 
            textDecoration: task.completed ? 'line-through' : 'none', 
            color: task.completed ? '#94a3b8' : '#1e293b',
            fontSize: '15px',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
        >
          {task.title}
        </span>
        <span style={{ 
          fontSize: '11px', 
          padding: '4px 10px', 
          borderRadius: '20px', 
          fontWeight: '600',
          letterSpacing: '0.3px',
          ...getBadgeStyle(task.category) 
        }}>
          {task.category}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{ 
          background: 'transparent', 
          color: '#ef4444', 
          border: '1px solid #fee2e2', 
          padding: '6px 12px', 
          borderRadius: '8px', 
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '13px',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ef4444';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#ef4444';
        }}
      >
        Delete
      </button>
    </div>
  );
}
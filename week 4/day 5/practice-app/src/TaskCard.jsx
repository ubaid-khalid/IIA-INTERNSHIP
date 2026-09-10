export default function TaskCard({ id, title, category, isCompleted, priority, onToggle }) {
  return (
    <div style={{
      background: '#fff',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #e2e8f0',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Interactive Checkbox Event */}
        <input 
          type="checkbox" 
          checked={isCompleted} 
          onChange={() => onToggle(id)}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <div>
          <h4 style={{ 
            margin: '0 0 4px 0', 
            textDecoration: isCompleted ? 'line-through' : 'none',
            color: isCompleted ? '#94a3b8' : '#1e293b' 
          }}>
            {title}
          </h4>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Category: {category}</span>
        </div>
      </div>

      {/* Conditional Rendering using Ternary and && */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {priority === 'High' && !isCompleted && (
          <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
            🔥 High Priority
          </span>
        )}
        <span style={{
          background: isCompleted ? '#dcfce7' : '#fef9c3',
          color: isCompleted ? '#166534' : '#854d0e',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 'bold'
        }}>
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
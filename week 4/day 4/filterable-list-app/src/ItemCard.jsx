export default function ItemCard({ id, name, category, isFavorite, onDelete, onToggleFavorite }) {
  return (
    <div style={{
      background: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #eaeaea'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Favorite Toggle Button */}
        <button 
          onClick={() => onToggleFavorite(id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <div>
          <span style={{ fontWeight: '500', color: '#333', display: 'block' }}>{name}</span>
          <span style={{ 
            background: '#e0f2fe', 
            color: '#0369a1', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            {category}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button 
        onClick={() => onDelete(id)}
        style={{
          background: '#fee2e2',
          color: '#dc2626',
          border: 'none',
          padding: '6px 10px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        Delete
      </button>
    </div>
  );
}
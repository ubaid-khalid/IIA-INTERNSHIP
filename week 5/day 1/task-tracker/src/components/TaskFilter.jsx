export function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Pending', 'Completed'];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center' }}>
      {filters.map((filter) => {
        const isActive = currentFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            style={{
              padding: '8px 18px',
              backgroundColor: isActive ? '#6366f1' : '#f1f5f9',
              color: isActive ? 'white' : '#475569',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 10px rgba(99, 102, 241, 0.3)' : 'none',
            }}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
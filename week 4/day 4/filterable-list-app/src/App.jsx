import { useState } from 'react';
import ItemCard from './ItemCard';

const INITIAL_ITEMS = [
  { id: 1, name: 'React.js Fundamentals', category: 'Frontend', isFavorite: false },
  { id: 2, name: 'Node.js & Express API', category: 'Backend', isFavorite: true },
  { id: 3, name: 'CSS Grid & Flexbox', category: 'Frontend', isFavorite: false },
];

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Form state for adding new items
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Frontend');

  // Add Item Handler
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newItemName,
      category: newItemCategory,
      isFavorite: false
    };
    setItems([newItem, ...items]);
    setNewItemName('');
  };

  // Delete Item Handler
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Toggle Favorite Handler
  const handleToggleFavorite = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  // Filter Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      fontFamily: 'sans-serif',
      padding: '24px',
      background: '#f8fafc',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
    }}>
      <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>Interactive Tech Skills Manager</h2>
      
      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          placeholder="Add new skill..." 
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
        />
        <select 
          value={newItemCategory} 
          onChange={(e) => setNewItemCategory(e.target.value)}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Tools">Tools</option>
        </select>
        <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add
        </button>
      </form>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search skills..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
      />

      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['All', 'Frontend', 'Backend', 'Tools'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === cat ? '#0284c7' : '#e2e8f0',
              color: selectedCategory === cat ? '#fff' : '#334155',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List Rendering using .map() */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              id={item.id}
              name={item.name} 
              category={item.category} 
              isFavorite={item.isFavorite}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>No items found.</p>
        )}
      </div>
    </div>
  );
}
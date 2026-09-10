import { useState } from 'react';
import ToggleButton from './ToggleButton';

function App() {
  const [isTurnedOn, setIsTurnedOn] = useState(false);

  const handleToggle = () => {
    setIsTurnedOn(prev => !prev);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px 50px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        minWidth: '320px'
      }}>
        <h2 style={{ color: '#333333', marginBottom: '8px', fontSize: '22px' }}>Interactive Toggle</h2>
        <p style={{ color: '#666666', fontSize: '14px', marginBottom: '24px' }}>
          System Status: {' '}
          <span style={{ 
            color: isTurnedOn ? '#28a745' : '#dc3545',
            fontWeight: 'bold' 
          }}>
            {isTurnedOn ? 'Active' : 'Inactive'}
          </span>
        </p>

        {/* Passing props to the child component */}
        <ToggleButton isOn={isTurnedOn} onToggle={handleToggle} />
      </div>
    </div>
  );
}

export default App;
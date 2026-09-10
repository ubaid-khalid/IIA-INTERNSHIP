import { useState, useEffect } from 'react';

export default function CounterApp() {
  // Local storage persistence for count
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counterValue');
    return saved !== null ? Number(saved) : 0;
  });

  const [step, setStep] = useState(1); // Increment/decrement step size
  const [history, setHistory] = useState([]); // Action history log
  const [message, setMessage] = useState('');

  // Save count to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('counterValue', count);
  }, [count]);

  // Limits
  const MIN_LIMIT = -20;
  const MAX_LIMIT = 20;

  // Helper to log history and trigger limit warning
  const updateCount = (newCount, actionName) => {
    if (newCount > MAX_LIMIT) {
      setMessage(`Maximum limit reached (${MAX_LIMIT})!`);
      return;
    }
    if (newCount < MIN_LIMIT) {
      setMessage(`Minimum limit reached (${MIN_LIMIT})!`);
      return;
    }

    setMessage('');
    setCount(newCount);
    setHistory((prev) => [`${actionName}: ${newCount}`, ...prev.slice(0, 4)]);
  };

  // Keyboard Navigation (ArrowUp = Increment, ArrowDown = Decrement)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') updateCount(count + step, 'Key Up');
      if (e.key === 'ArrowDown') updateCount(count - step, 'Key Down');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count, step]);

  return (
    <div style={containerStyle}>
      <h1>Interactive Counter App</h1>

      {/* State Display */}
      <div style={{ ...countStyle, color: count < 0 ? '#e11d48' : count > 0 ? '#16a34a' : '#0f172a' }}>
        {count}
      </div>

      {/* Dynamic Warning Message */}
      {message && <p style={{ color: '#e11d48', fontWeight: '600' }}>{message}</p>}

      {/* Step Size Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '8px', fontWeight: '500' }}>Step Size:</label>
        {[1, 5, 10].map((val) => (
          <button
            key={val}
            onClick={() => setStep(val)}
            style={{
              ...chipStyle,
              backgroundColor: step === val ? '#2563eb' : '#e2e8f0',
              color: step === val ? '#fff' : '#0f172a'
            }}
          >
            +{val}
          </button>
        ))}
      </div>

      {/* Main Control Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => updateCount(count - step, 'Decrement')} style={btnStyle}>
          - {step}
        </button>
        <button onClick={() => updateCount(0, 'Reset')} style={{ ...btnStyle, backgroundColor: '#fecdd3' }}>
          Reset
        </button>
        <button onClick={() => updateCount(count + step, 'Increment')} style={btnStyle}>
          + {step}
        </button>
      </div>

      {/* Keyboard Hint */}
      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '16px' }}>
        💡 Tip: Use <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to adjust the counter.
      </p>

      {/* Recent History Log */}
      {history.length > 0 && (
        <div style={historyBoxStyle}>
          <strong style={{ fontSize: '14px' }}>Recent Activity Log:</strong>
          <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', fontSize: '13px' }}>
            {history.map((entry, index) => (
              <li key={index} style={{ color: '#475569', padding: '2px 0' }}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Styling Objects
const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '24px',
  textAlign: 'center',
  fontFamily: 'sans-serif',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  backgroundColor: '#ffffff'
};

const countStyle = {
  fontSize: '56px',
  fontWeight: 'bold',
  margin: '12px 0'
};

const btnStyle = {
  padding: '10px 18px',
  fontSize: '15px',
  fontWeight: '600',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#f1f5f9',
  color: '#0f172a'
};

const chipStyle = {
  padding: '4px 10px',
  fontSize: '13px',
  borderRadius: '16px',
  border: 'none',
  margin: '0 4px',
  cursor: 'pointer',
  fontWeight: '600'
};

const historyBoxStyle = {
  marginTop: '20px',
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  textAlign: 'left'
};
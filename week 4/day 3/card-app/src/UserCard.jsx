import { useState } from 'react';
import PropTypes from 'prop-types';

function UserCard({ name, role, isOnline, points, theme }) {
  // Interactive state inside the component
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div style={{
      background: theme === 'dark' ? '#1f2028' : '#ffffff',
      color: theme === 'dark' ? '#f3f4f6' : '#202124',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      width: '280px',
      textAlign: 'left',
      fontFamily: 'sans-serif',
      border: '1px solid #eaeaea',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Section: Conditional Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        
        {/* Ternary Conditional Rendering for Online Status */}
        <span style={{
          backgroundColor: isOnline ? '#e6f4ea' : '#fce8e6',
          color: isOnline ? '#137333' : '#c5221f',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {isOnline ? '● Online' : '○ Offline'}
        </span>

        {/* Logical && Conditional Rendering for VIP Badge */}
        {points > 100 && (
          <span style={{
            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            ⭐ VIP
          </span>
        )}
      </div>

      <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{name}</h3>
      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>{role}</p>

      {/* Combining Props + Conditional Rendering for Reward Box */}
      <div style={{ 
        padding: '10px 12px', 
        borderRadius: '8px', 
        backgroundColor: theme === 'dark' ? '#2e303a' : '#f8f9fa',
        fontSize: '13px',
        marginBottom: '16px'
      }}>
        Points: <strong>{points}</strong>
        <div style={{ marginTop: '4px', color: points >= 50 ? '#1a73e8' : '#d93025', fontWeight: 'bold' }}>
          {points >= 50 ? '🎉 Reward Unlocked' : '🔒 Locked'}
        </div>
      </div>

      {/* Interactive Button */}
      <button 
        onClick={() => setIsFollowing(!isFollowing)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor: isFollowing ? '#10b981' : '#3b82f6',
          color: '#ffffff',
          transition: 'background 0.2s'
        }}
      >
        {isFollowing ? 'Following ✓' : 'Follow'}
      </button>
    </div>
  );
}

// PropTypes Validation
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  isOnline: PropTypes.bool,
  points: PropTypes.number,
  theme: PropTypes.string,
};

// Default Props (Fallback values if props are missing)
UserCard.defaultProps = {
  role: 'Community Member',
  isOnline: false,
  points: 10,
  theme: 'light',
};

export default UserCard;
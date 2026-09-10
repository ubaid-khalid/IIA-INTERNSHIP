function ToggleButton({ isOn, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: isOn ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
        padding: '6px',
        borderRadius: '50px',
        cursor: 'pointer',
        width: '90px',
        height: '42px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
    >
      <div 
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          transform: isOn ? 'translateX(48px)' : 'translateX(0px)',
          transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        }}
      />
      <span style={{
        position: 'absolute',
        left: isOn ? '14px' : '46px',
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        userSelect: 'none',
        transition: 'left 0.3s ease'
      }}>
        {isOn ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export default ToggleButton;

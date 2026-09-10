import UserCard from './UserCard';

export default function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      gap: '24px',
      padding: '20px',
      flexWrap: 'wrap'
    }}>
      {/* Card 1: Custom Props */}
      <UserCard 
        name="Ubaid Khalid" 
        role="Frontend Intern" 
        isOnline={true} 
        points={120} 
        theme="light"
      />

      {/* Card 2: Using Default Props (Omitted role and theme) */}
      <UserCard 
        name="Ali Ahmed" 
        isOnline={false} 
        points={30} 
      />

      {/* Card 3: High points for VIP badge trigger */}
      <UserCard 
        name="Hamza Latif" 
        role="React Developer" 
        isOnline={true} 
        points={150} 
        theme="light"
      />
    </div>
  );
}
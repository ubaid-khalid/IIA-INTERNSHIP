import { useState } from 'react';
import TaskCard from './TaskCard';

// Initial practice tasks list
const INITIAL_TASKS = [
  { id: 1, title: 'Practice props & conditional rendering exercises', category: 'React Basics', isCompleted: true, priority: 'High' },
  { id: 2, title: 'Complete list rendering with .map() and keys', category: 'Lists', isCompleted: false, priority: 'High' },
  { id: 3, title: 'Combine components into a small app layout', category: 'Composition', isCompleted: false, priority: 'Medium' },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [mentorNotes, setMentorNotes] = useState('Great progress on component structure! Keep refining state flow.');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Toggle Task Completion Handler
  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Calculate progress metrics
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      fontFamily: 'sans-serif',
      padding: '24px',
      background: '#f8fafc',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
    }}>
      <h2 style={{ color: '#0f172a', marginBottom: '4px' }}>🚀 Student Practice & Mentor Hub</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        Mastering React: Components, Props, Lists & Interactive State.
      </p>

      {/* Progress Overview */}
      <div style={{ background: '#e0f2fe', padding: '14px 18px', borderRadius: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px', fontWeight: 'bold', color: '#0369a1' }}>
          <span>Overall Progress</span>
          <span>{completedCount} / {tasks.length} Done ({progressPercentage}%)</span>
        </div>
        <div style={{ width: '100%', background: '#bae6fd', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercentage}%`, background: '#0284c7', height: '100%', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* List Rendering using .map() and Keys */}
      <h3 style={{ fontSize: '16px', color: '#334155', marginBottom: '12px' }}>Practice Tasks Checklist</h3>
      <div>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            id={task.id}
            title={task.title}
            category={task.category}
            isCompleted={task.isCompleted}
            priority={task.priority}
            onToggle={handleToggleTask}
          />
        ))}
      </div>

      {/* Review & Mentor Check-in Section */}
      <div style={{ marginTop: '24px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: '0', fontSize: '15px', color: '#1e293b' }}>👨‍🏫 Mentor Check-in & Review</h3>
          <button 
            onClick={() => setIsEditingNotes(!isEditingNotes)}
            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
          >
            {isEditingNotes ? 'Save Note' : 'Edit Feedback'}
          </button>
        </div>

        {isEditingNotes ? (
          <textarea 
            value={mentorNotes} 
            onChange={(e) => setMentorNotes(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #94a3b8', fontSize: '13px', boxSizing: 'border-box' }}
          />
        ) : (
          <p style={{ margin: '0', fontSize: '13px', color: '#475569', fontStyle: 'italic' }}>
            "{mentorNotes}"
          </p>
        )}
      </div>
    </div>
  );
}
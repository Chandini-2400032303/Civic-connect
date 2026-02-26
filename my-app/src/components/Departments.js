import React, { useState } from 'react';

const Departments = ({ user, onNavigateToMessage }) => {
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = [
    { id: 1, name: 'Infrastructure Department', description: 'Roads, bridges, public works', icon: '🏗️', email: 'infrastructure@gov.com' },
    { id: 2, name: 'Health Department', description: 'Healthcare services, hospitals', icon: '🏥', email: 'health@gov.com' },
    { id: 3, name: 'Education Department', description: 'Schools, colleges, education', icon: '📚', email: 'education@gov.com' },
    { id: 4, name: 'Safety Department', description: 'Police, fire, emergency services', icon: '🚨', email: 'safety@gov.com' },
    { id: 5, name: 'Environment Department', description: 'Parks, sanitation, pollution', icon: '🌳', email: 'environment@gov.com' },
    { id: 6, name: 'Finance Department', description: 'Budget, taxes, revenue', icon: '💰', email: 'finance@gov.com' }
  ];

  const handleSendMessage = () => {
    const dept = departments.find(d => d.id == selectedDept);
    onNavigateToMessage(dept);
  };

  return (
    <div>
      <div className="card">
        <h3>Select Department</h3>
        <select 
          value={selectedDept || ''} 
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ width: '100%', padding: '15px', fontSize: '16px', border: '2px solid #ddd', borderRadius: '8px', marginTop: '15px' }}
        >
          <option value="">-- Choose a Department --</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.icon} {dept.name}</option>
          ))}
        </select>
      </div>

      {selectedDept && (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          {departments.filter(d => d.id == selectedDept).map(dept => (
            <div key={dept.id}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>{dept.icon}</div>
              <h2 style={{ marginBottom: '15px' }}>{dept.name}</h2>
              <p style={{ color: '#7f8c8d', fontSize: '18px', marginBottom: '20px' }}>{dept.description}</p>
              <p style={{ color: '#95a5a6', marginBottom: '30px' }}>Contact: {dept.email}</p>
              <button 
                onClick={handleSendMessage}
                style={{ padding: '15px 40px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
              >
                Send Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departments;

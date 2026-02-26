import React from 'react';

const CitizenMessages = ({ user, messages }) => {
  const myMessages = messages.filter(msg => msg.from === user.name && msg.notified);

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>Notified Messages ({myMessages.length})</h3>

      {myMessages.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#95a5a6' }}>
          <p>No notified messages yet. Politicians will acknowledge your messages here.</p>
        </div>
      ) : (
        myMessages.map(msg => (
          <div key={msg.id} className="card" style={{ borderLeft: '4px solid #27ae60' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4>To: {msg.department}</h4>
              <span style={{ color: '#95a5a6', fontSize: '14px' }}>{msg.date}</span>
            </div>
            <p style={{ color: '#555' }}>{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CitizenMessages;

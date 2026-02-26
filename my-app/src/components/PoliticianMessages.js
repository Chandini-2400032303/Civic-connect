import React from 'react';

const PoliticianMessages = ({ user, messages, setMessages }) => {
  const myMessages = messages.filter(msg => msg.department);
  const unreadCount = myMessages.filter(msg => !msg.read).length;

  const markAsRead = (msgId) => {
    setMessages(messages.map(msg => 
      msg.id === msgId ? { ...msg, read: true } : msg
    ));
  };

  const toggleNotified = (msgId) => {
    setMessages(messages.map(msg => 
      msg.id === msgId ? { ...msg, notified: true } : msg
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Received Messages</h3>
        {unreadCount > 0 && (
          <span style={{ background: '#e74c3c', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
            {unreadCount} New
          </span>
        )}
      </div>

      {myMessages.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#95a5a6' }}>
          <p>No messages received yet.</p>
        </div>
      ) : (
        myMessages.map(msg => (
          <div 
            key={msg.id} 
            className="card" 
            style={{ borderLeft: msg.read ? 'none' : '4px solid #e74c3c' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4>{msg.department}</h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {!msg.read && <span style={{ background: '#e74c3c', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>NEW</span>}
                {msg.notified && <span style={{ background: '#27ae60', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>NOTIFIED</span>}
              </div>
            </div>
            <p style={{ color: '#555', marginBottom: '10px' }}>{msg.message}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '12px', color: '#95a5a6' }}>
                From: {msg.from} | {msg.date}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {!msg.read && (
                  <button 
                    onClick={() => markAsRead(msg.id)}
                    style={{ padding: '6px 15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Mark as Read
                  </button>
                )}
                {!msg.notified && (
                  <button 
                    onClick={() => toggleNotified(msg.id)}
                    style={{ padding: '6px 15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Mark as Notified
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PoliticianMessages;

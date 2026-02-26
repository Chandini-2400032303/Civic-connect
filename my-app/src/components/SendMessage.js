import React, { useState } from 'react';

const SendMessage = ({ user, department, onBack, onSend, sharedMessages, setSharedMessages }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        department: department.name,
        message: message,
        from: user.name,
        date: new Date().toLocaleString(),
        read: false,
        notified: false
      };
      setSharedMessages([...sharedMessages, newMessage]);
      alert(`✓ Message sent successfully to ${department.name}!`);
      setMessage('');
      onBack();
    }
  };

  return (
    <div>
      <button 
        onClick={onBack}
        style={{ padding: '10px 20px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontSize: '16px' }}
      >
        ← Back to Departments
      </button>

      <div className="card" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>{department.icon}</div>
          <h2>{department.name}</h2>
          <p style={{ color: '#7f8c8d', fontSize: '16px' }}>{department.description}</p>
          <p style={{ color: '#95a5a6', marginTop: '10px' }}>Contact: {department.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '15px' }}>Compose Message</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
            style={{ width: '100%', padding: '15px', minHeight: '200px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', resize: 'vertical' }}
          />
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{ padding: '15px 40px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              Send Message
            </button>
            <button 
              type="button"
              onClick={onBack}
              style={{ padding: '15px 40px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;

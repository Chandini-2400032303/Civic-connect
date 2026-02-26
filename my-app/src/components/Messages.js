import React, { useState } from 'react';

const Messages = ({ user }) => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'Department', text: 'Thank you for your message. We will review it.', type: 'received' },
    { id: 2, from: user.name, text: 'When will the road repairs begin?', type: 'sent' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        from: user.name, 
        text: newMessage, 
        type: 'sent'
      }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="card">
        <h4>Messages</h4>
        <div className="message-thread">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <strong>{msg.from}</strong>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

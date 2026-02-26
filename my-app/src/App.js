import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [sharedMessages, setSharedMessages] = useState([]);
  const [sharedFeedbacks, setSharedFeedbacks] = useState([
    { id: 1, department: 'Infrastructure Department', rating: 4, comment: 'Good response time', author: 'John Doe', date: '2024-01-15' },
    { id: 2, department: 'Health Department', rating: 5, comment: 'Excellent service', author: 'Jane Smith', date: '2024-01-14' }
  ]);
  const [sharedIssues, setSharedIssues] = useState([]);

  return (
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Dashboard 
          user={user} 
          setUser={setUser} 
          sharedMessages={sharedMessages} 
          setSharedMessages={setSharedMessages}
          sharedFeedbacks={sharedFeedbacks}
          setSharedFeedbacks={setSharedFeedbacks}
          sharedIssues={sharedIssues}
          setSharedIssues={setSharedIssues}
        />
      )}
    </div>
  );
}

export default App;

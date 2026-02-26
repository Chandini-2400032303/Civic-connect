import React, { useState } from 'react';
import { hasPermission } from '../utils/auth';

const Issues = ({ user, department, sharedIssues, setSharedIssues }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Infrastructure', description: '' });

  const filteredIssues = department 
    ? sharedIssues.filter(issue => issue.category === department || issue.department === department)
    : sharedIssues;

  const submitIssue = (e) => {
    e.preventDefault();
    const newIssue = { 
      id: Date.now(), 
      ...formData, 
      status: 'pending', 
      author: user.name,
      date: new Date().toLocaleString()
    };
    setSharedIssues([...sharedIssues, newIssue]);
    setFormData({ title: '', category: 'Infrastructure', description: '' });
    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    if (user.role === 'politician') {
      setSharedIssues(sharedIssues.map(issue => 
        issue.id === id ? { ...issue, status: newStatus } : issue
      ));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Community Issues</h3>
        {user.role === 'citizen' && (
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {showForm ? 'Cancel' : '+ Report Issue'}
          </button>
        )}
      </div>

      {showForm && user.role === 'citizen' && (
        <div className="card">
          <h4>Report New Issue</h4>
          <form className="issue-form" onSubmit={submitIssue}>
            <input
              type="text"
              placeholder="Issue title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="Infrastructure Department">Infrastructure Department</option>
              <option value="Health Department">Health Department</option>
              <option value="Education Department">Education Department</option>
              <option value="Safety Department">Safety Department</option>
              <option value="Environment Department">Environment Department</option>
              <option value="Finance Department">Finance Department</option>
            </select>
            <textarea
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <button type="submit">Submit Issue</button>
          </form>
        </div>
      )}

      {filteredIssues.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#95a5a6' }}>
          <p>No issues reported yet.</p>
        </div>
      ) : (
        filteredIssues.map(issue => (
          <div key={issue.id} className="card">
            <h4>{issue.title}
              <span className={`badge ${issue.status}`}>{issue.status}</span>
            </h4>
            <p><strong>Category:</strong> {issue.category}</p>
            <p style={{ margin: '10px 0', color: '#555' }}>{issue.description}</p>
            <p><strong>Reported by:</strong> {issue.author} on {issue.date}</p>
            {user.role === 'politician' && (
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => updateStatus(issue.id, 'pending')} 
                  style={{ padding: '8px 16px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Pending
                </button>
                <button 
                  onClick={() => updateStatus(issue.id, 'in-progress')} 
                  style={{ padding: '8px 16px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  In Progress
                </button>
                <button 
                  onClick={() => updateStatus(issue.id, 'resolved')} 
                  style={{ padding: '8px 16px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Issues;

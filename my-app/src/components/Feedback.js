import React, { useState } from 'react';

const Feedback = ({ user, feedbackView, sharedFeedbacks, setSharedFeedbacks }) => {
  const [feedbacks, setFeedbacks] = useState(sharedFeedbacks);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ department: 'Infrastructure Department', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const departments = [
    'Infrastructure Department',
    'Health Department',
    'Education Department',
    'Safety Department',
    'Environment Department',
    'Finance Department'
  ];

  const submitFeedback = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (editingId) {
      const updated = feedbacks.map(fb => 
        fb.id === editingId 
          ? { ...fb, department: formData.department, rating: formData.rating, comment: formData.comment }
          : fb
      );
      setFeedbacks(updated);
      setSharedFeedbacks(updated);
      setEditingId(null);
    } else {
      const newFeedback = { 
        id: Date.now(), 
        ...formData, 
        author: user.name,
        date: new Date().toISOString().split('T')[0]
      };
      const updated = [...feedbacks, newFeedback];
      setFeedbacks(updated);
      setSharedFeedbacks(updated);
    }
    
    setFormData({ department: 'Infrastructure Department', rating: 0, comment: '' });
    setShowForm(false);
  };

  const handleEdit = (feedback) => {
    setFormData({ 
      department: feedback.department, 
      rating: feedback.rating, 
      comment: feedback.comment 
    });
    setEditingId(feedback.id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ department: 'Infrastructure Department', rating: 0, comment: '' });
  };

  const myFeedbacks = feedbacks.filter(fb => fb.author === user.name);
  const displayFeedbacks = feedbackView === 'my' ? myFeedbacks : feedbacks;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Department Feedback</h3>
        {!editingId && (
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {showForm ? 'Cancel' : '+ Give Feedback'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="card">
          <h4>{editingId ? 'Edit Feedback' : 'Submit Feedback'}</h4>
          <form onSubmit={submitFeedback}>
            <select 
              value={formData.department} 
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold' }}>Select Rating:</label>
              <div style={{ fontSize: '40px', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ 
                      color: star <= (hoverRating || formData.rating) ? '#ffd700' : '#ddd',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <textarea
              placeholder="Your feedback..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px', resize: 'vertical' }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {editingId ? 'Update Feedback' : 'Submit Feedback'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {displayFeedbacks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: '#95a5a6' }}>
          <p>No feedbacks to display.</p>
        </div>
      ) : (
        displayFeedbacks.map(feedback => (
          <div key={feedback.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>{feedback.department}</h4>
              <span style={{ color: '#ffd700', fontSize: '20px' }}>{'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}</span>
            </div>
            <p style={{ margin: '10px 0', color: '#555' }}>{feedback.comment}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '12px', color: '#95a5a6' }}>
                By {feedback.author} on {feedback.date}
              </p>
              {feedback.author === user.name && feedbackView === 'my' && (
                <button 
                  onClick={() => handleEdit(feedback)}
                  style={{ padding: '8px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feedback;

import React, { useState } from 'react';

const Polls = ({ user }) => {
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'Should we build a new community center?',
      options: [
        { id: 1, text: 'Yes', votes: 45 },
        { id: 2, text: 'No', votes: 23 },
        { id: 3, text: 'Need more info', votes: 12 }
      ],
      voted: null
    },
    {
      id: 2,
      question: 'Priority for next budget allocation?',
      options: [
        { id: 1, text: 'Education', votes: 67 },
        { id: 2, text: 'Infrastructure', votes: 54 },
        { id: 3, text: 'Healthcare', votes: 43 }
      ],
      voted: null
    }
  ]);

  const vote = (pollId, optionId) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId && !poll.voted) {
        return {
          ...poll,
          voted: optionId,
          options: poll.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          )
        };
      }
      return poll;
    }));
  };

  return (
    <div>
      <h3>Active Polls</h3>
      {polls.map(poll => (
        <div key={poll.id} className="card">
          <h4>{poll.question}</h4>
          {poll.voted && <p style={{ color: '#27ae60', marginBottom: '10px' }}>✓ You voted</p>}
          {poll.options.map(option => (
            <div
              key={option.id}
              className={`poll-option ${poll.voted === option.id ? 'voted' : ''}`}
              onClick={() => !poll.voted && vote(poll.id, option.id)}
            >
              <span>{option.text}</span>
              <span>{option.votes} votes</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Polls;

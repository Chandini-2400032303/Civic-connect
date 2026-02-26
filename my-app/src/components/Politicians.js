import React from 'react';

const Politicians = ({ user }) => {
  const politicians = [
    { id: 1, name: 'John Smith', position: 'Mayor', district: 'District 1' },
    { id: 2, name: 'Sarah Johnson', position: 'Council Member', district: 'District 2' },
    { id: 3, name: 'Mike Davis', position: 'Senator', district: 'State' }
  ];

  return (
    <div>
      <h3>Connect with Politicians</h3>
      {politicians.map(pol => (
        <div key={pol.id} className="card politician-card">
          <div>
            <h4>{pol.name}</h4>
            <p>{pol.position} - {pol.district}</p>
          </div>
          <button>Message</button>
        </div>
      ))}
    </div>
  );
};

export default Politicians;

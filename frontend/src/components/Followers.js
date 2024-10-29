import React from 'react';

function Followers() {
  const followers = ['John Doe', 'Jane Smith', 'Alice Johnson'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Followers</h2>
      <ul className="space-y-2">
        {followers.map((follower, index) => (
          <li key={index} className="p-2 border border-gray-300 rounded">{follower}</li>
        ))}
      </ul>
    </div>
  );
}

export default Followers;

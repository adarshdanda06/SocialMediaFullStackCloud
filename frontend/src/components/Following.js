import React from 'react';

function Following() {
  const following = ['Tom Brown', 'Emily White', 'Michael Green'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Following</h2>
      <ul className="space-y-2">
        {following.map((follow, index) => (
          <li key={index} className="p-2 border border-gray-300 rounded">{follow}</li>
        ))}
      </ul>
    </div>
  );
}

export default Following;

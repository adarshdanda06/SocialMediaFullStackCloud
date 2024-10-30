import React from 'react';

function Users() {
  const users = ['Samuel Lee', 'Karen Thompson', 'David Wright'];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="p-2 border border-gray-300 rounded">{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;

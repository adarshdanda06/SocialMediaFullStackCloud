import React from 'react';

function Navbar({ setActiveComponent }) {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Social Dashboard</h1>
        <div className="flex space-x-4">
          <button onClick={() => setActiveComponent('login')}>Login</button>
          <button onClick={() => setActiveComponent('addPost')}>Add Post</button>
          <button onClick={() => setActiveComponent('followers')}>Followers</button>
          <button onClick={() => setActiveComponent('following')}>Following</button>
          <button onClick={() => setActiveComponent('users')}>Users</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

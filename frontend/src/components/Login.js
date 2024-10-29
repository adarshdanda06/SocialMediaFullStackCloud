import React from 'react';

function Login() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded" />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;

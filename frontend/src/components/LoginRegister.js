import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';

function LoginRegister(){
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-96 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form className="space-y-4">

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>
        {!isLogin && (
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>
        )}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-8 text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={toggleForm}
          className="text-blue-400 hover:underline focus:outline-none transition duration-300"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NoAccessPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-radial from-gray-800 via-gray-900 to-black opacity-50 animate-pulse"></div>
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Need to Login</h1>
        <p className="text-xl mb-8">Please log in to access this page.</p>
        <button 
          onClick={handleLoginClick}
          className="px-6 py-3 rounded-md transition-colors duration-300 bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default NoAccessPage;
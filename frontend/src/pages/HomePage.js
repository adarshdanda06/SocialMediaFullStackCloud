import React, { useState } from 'react';
import WelcomeHome from '../components/WelcomeHome';
import LoginRegister from '../components/LoginRegister';
const path = "http://localhost:8000";


function HomePage() {
  const [isStarted, setIsStarted] = useState(false);

  const handleGetStarted = () => {
    setIsStarted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-radial from-gray-800 via-gray-900 to-black opacity-50 animate-pulse"></div>
      <div className={`z-10 flex ${isStarted ? 'justify-between max-w-5xl px-20' : 'justify-center'}`}>
        <div className={`text-center transition-all duration-500 ${isStarted ? 'transform -translate-x-1/4 translate-y-28' : ''}`}>
          <h1 className="text-5xl font-bold mb-4"><WelcomeHome /></h1>
          <p className="text-xl mb-8"></p>
          {!isStarted && (
            <button 
              onClick={handleGetStarted}
              className="px-4 py-2 h-10 rounded-md transition-colors duration-300 bg-gray-700 hover:bg-gray-600 text-white"
            >
              Get Started
            </button>
          )}
        </div>
        {isStarted && (
          <div className="transition-all duration-500 transform translate-x-1/4">
            <LoginRegister />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
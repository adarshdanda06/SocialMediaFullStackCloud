import React, { useState } from 'react';

function UserInFollow({ imageUrl }) {
  return (
    <div className="bg-[#2a2a2a] rounded-2xl shadow-lg hover:bg-[#333333] transition-all cursor-pointer flex items-center space-x-4">
      <img 
        src={imageUrl} 
        alt="Profile" 
        className="ml-6 w-12 h-12 rounded-full object-cover"
      />
      <p className="text-gray-300 text-sm">Username</p>
    </div>
  );
};

export default UserInFollow;
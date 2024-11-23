import React, { useState } from 'react';

function UserInFollow({ name }) {
  return (
    <div className="bg-[#2a2a2a] rounded-2xl shadow-lg hover:bg-[#333333] transition-all cursor-pointer flex items-center space-x-4 h-10">
      <p className="text-gray-300 text-sm pl-5">{name}</p>
    </div>
  );
};

export default UserInFollow;
import React, { useState } from 'react';

function PostItem({ imageUrl }) {
  return (
    <div className="bg-[#2a2a2a] rounded-2xl overflow-hidden aspect-square shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
      <img 
        src={imageUrl} 
        alt="Post" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};


export default PostItem;
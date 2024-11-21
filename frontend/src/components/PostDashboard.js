import React from "react";
import PostItem from "./PostItem";


function PostsDashboard({ isOpen, onClose }) {
    // Example posts data
    const posts = [
      { id: 1, imageUrl: '/path-to-image-1.jpg' },
      { id: 2, imageUrl: '/path-to-image-2.jpg' },
      { id: 3, imageUrl: '/path-to-image-3.jpg' },
      // Add more posts as needed
    ];
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-[#212121] w-[90%] h-[90%] rounded-3xl p-8 relative overflow-hidden">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
  
          {/* Header */}
          <h2 className="text-gray-200 text-2xl mb-6">Posts</h2>
  
          {/* Posts Grid */}
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            <div className="grid grid-cols-3 gap-4">
              {posts.map(post => (
                <PostItem 
                  key={post.id} 
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default PostsDashboard;
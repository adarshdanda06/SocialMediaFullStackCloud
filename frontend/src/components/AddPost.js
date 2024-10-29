import React from 'react';

function AddPost() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
      <textarea placeholder="What's on your mind?" className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
      <button className="w-full bg-blue-500 text-white p-2 rounded">Post</button>
    </div>
  );
}

export default AddPost;

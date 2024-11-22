import React from "react";
import UserCard from "../components/UserCard";
import { FaSearch } from "react-icons/fa";
import NavBar from "../components/NavBar";

function ExplorePage() {
    const users = [
      { id: 1, username: "User1", imageUrl: "/path-to-image-1.jpg" },
      { id: 2, username: "User2", imageUrl: "/path-to-image-2.jpg" },
    ];
  
    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
        <div className="w-full bg-[#212121] rounded-[2rem] shadow-2xl p-8">
          {/* Navigation Bar */}
          <div className="mb-8">
            <NavBar />
          </div>
  
          {/* Search Bar */}
          <div className="relative mb-8 max-w-3xl mx-auto">
            <input 
              type="text"
              placeholder="Search users..."
              className="w-full bg-[#2a2a2a] text-gray-200 px-6 py-3 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
  
          {/* Users Grid */}
          <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-4 -mr-4">
            <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
              {users.map(user => (
                <UserCard 
                  key={user.id}
                  username={user.username}
                  imageUrl={user.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
  
export default ExplorePage;
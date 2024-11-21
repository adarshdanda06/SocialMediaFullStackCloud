import React from 'react';
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaImage } from 'react-icons/fa';
import PostsDashboard from '../components/PostDashboard';
import { useState } from 'react';

function ProfilePage() {
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);


  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        {/* Top Navigation */}
        <nav className="flex justify-between items-center">
          <div className="flex space-x-8">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Explore</button>
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Profile</button>
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Logout</button>
          </div>
          <div className="bg-[#000000] rounded-full px-4 py-1">
            <span className="text-gray-300 text-sm">● Online</span>
          </div>
        </nav>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="relative flex justify-between items-center py-28">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img 
                  src="/path-to-large-profile.jpg" 
                  className="w-40 h-40 rounded-full border-4 border-[#2a2a2a] shadow-xl"
                  alt="Large profile"
                />
                <div className="absolute w-44 -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] px-4 py-1 rounded-full shadow-lg">
                  <span className="text-sm text-gray-300 text-center block">Name</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Posts', value: '0' },
                { label: 'Likes', value: '64' },
                { label: 'Following', value: '83' },
                { label: 'Followers', value: '91' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-2xl font-bold text-gray-200">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {['Name', 'Bio'].map((item, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg">
              <div className="flex items-center space-x-3">
                {index === 0 && <FaUserFriends className="text-gray-400" />}
                {index === 1 && <FaMapMarkerAlt className="text-gray-400" />}
                <span className="text-gray-300">{item}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-[#2a2a2a]">
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsPostsOpen(true)}>Posts</button>
          <PostsDashboard 
                isOpen={isPostsOpen}
                onClose={() => setIsPostsOpen(false)}
            />
          <button className="text-gray-400 hover:text-white transition-colors text-sm">Following</button>
          <button className="text-gray-400 hover:text-white transition-colors text-sm">Followers</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
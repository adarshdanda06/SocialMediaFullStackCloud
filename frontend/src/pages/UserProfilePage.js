import React from 'react';
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';

function UserProfilePage() {
  const [isFollowing, setFollowing] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        <NavBar />
        <StatGrid />
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg">
            <div className="flex items-center space-x-3">
              <FaUserFriends className="text-gray-400" />
              <span className="text-gray-300">Bio</span>
            </div>
          </div>
          <button className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg"
            onClick={() => setFollowing(!isFollowing)}>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-gray-400" />
              {isFollowing ? 
              <span className="text-gray-300">Unfollow</span> :
              <span className="text-gray-300">Follow</span>}
            </div>
          </button>
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default UserProfilePage;

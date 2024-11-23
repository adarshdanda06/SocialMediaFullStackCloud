import React from 'react';
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';
import { useParams } from 'react-router-dom';
import PostsDashboard from '../components/PostDashboard';

function UserProfilePage() {
  const [isFollowing, setFollowing] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);

  const { name } = useParams();


  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        <NavBar />
        <StatGrid currentUser={name}/>
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
        <div className="flex justify-between items-center pt-6 border-t border-[#2a2a2a]">
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsPostsOpen(true)}>Posts</button>
          <PostsDashboard 
                isOpen={isPostsOpen}
                onClose={() => setIsPostsOpen(false)}
            />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

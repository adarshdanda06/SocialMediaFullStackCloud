import React from 'react';
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaImage } from 'react-icons/fa';
import PostsDashboard from '../components/PostDashboard';
import { useState } from 'react';
import FollowersDashboard from '../components/FollowersDashboard';
import FollowingDashboard from '../components/FollowingDashboard';
import EditableField from '../components/EditableField';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';


function ProfilePage() {
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);


  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        {/* Top Navigation */}
        <NavBar />
        {/* Content Grid */}
        <StatGrid />

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6">
      <EditableField 
        label="Name" 
        icon={<FaUserFriends className="text-gray-400" />} 
      />
      <EditableField 
        label="Bio" 
        icon={<FaMapMarkerAlt className="text-gray-400" />} 
      />
    </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-[#2a2a2a]">
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsPostsOpen(true)}>Posts</button>
          <PostsDashboard 
                isOpen={isPostsOpen}
                onClose={() => setIsPostsOpen(false)}
            />
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsFollowersOpen(true)}>Followers</button>
          <FollowersDashboard
            isOpen={isFollowersOpen}
            onClose={() => setIsFollowersOpen(false)} />
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsFollowingOpen(true)}>Following</button>
          <FollowingDashboard
            isOpen={isFollowingOpen}
            onClose={() => setIsFollowingOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


/*
function EditableFields() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <EditableField 
        label="Name" 
        icon={<FaUserFriends className="text-gray-400" />} 
      />
      <EditableField 
        label="Bio" 
        icon={<FaMapMarkerAlt className="text-gray-400" />} 
      />
    </div>
  );
}
      */
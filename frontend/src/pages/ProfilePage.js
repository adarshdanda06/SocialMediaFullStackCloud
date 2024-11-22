import React from 'react';
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';
import EditableField from '../components/EditableField';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';


function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        {/* Top Navigation */}
        <NavBar />
        <StatGrid />

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
        <BottomNavBar />
      </div>
    </div>
  );
};

export default ProfilePage;

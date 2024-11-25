import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';
import EditableField from '../components/EditableField';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import url from '../serverURL';

function ProfilePage() {
  const { setUser, user } = useContext(UserContext);
  const [bio, setBio] = useState("empty");
  const [profilePic, setProfilePic] = useState(null);
  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });
  useEffect(() => {
    async function fetchBio() {
      if (user) {
        const fetched = await api.get(`users/${user}/info`)
        const data = await fetched.data
        if(data["bio"]["S"]) {
          setBio(prevBio => {
            const newBio = data["bio"]["S"];
            console.log("New Bio: " + newBio);
            return newBio;
          });
        }
      }
    }
    fetchBio()
  }, [user, api]);
  useEffect(() => {
    async function fetchImg() {
      if (user) {
        const fetched = await api.get(`loginActions/getProfilePic/${user}`);
        const data = await fetched.data
        setProfilePic(data)
      }
    }
    fetchImg()
  }, [user, api]);

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        {/* Top Navigation */}
        <NavBar />
        <StatGrid currentUser={user} imgURL={profilePic} apiCheck={api} />

        <div className="grid grid-cols-1 gap-6">
      <EditableField 
        label="Bio" 
        icon={<FaUserFriends className="text-gray-400" />}
        initialValue={bio}
      />

    </div>
        <BottomNavBar 
          user={user}
        />
      </div>
    </div>
  );
};

export default ProfilePage;

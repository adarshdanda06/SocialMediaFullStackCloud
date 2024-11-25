import React from 'react';
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaImage } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import StatGrid from '../components/StatGrid';
import NavBar from '../components/NavBar';
import BottomNavBar from '../components/BottomNavBar';
import { useParams } from 'react-router-dom';
import PostsDashboard from '../components/PostDashboard';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import url from '../serverURL';



function UserProfilePage() {

  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [bio, setBio] = useState("empty");
  const [profilePic, setProfilePic] = useState(null);
  const { name } = useParams();
  const { user } = useContext(UserContext);

  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });
  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    async function getCurrentState() {
      if (name && user) {
        try {
          const fetched = await api.get(`followingInfo/${name}/followers`);
          const data = await fetched.data;
          return data.includes(user);
        } catch (error) {
          console.error('Error fetching follow status:', error);
          return false;
        }
      }
      return false;
    }
  
    getCurrentState().then(result => setFollowing(result));
  }, [name, user, api]);



  useEffect(() => {
    async function fetchBio() {
      if (name) {
        const fetched = await api.get(`users/${name}/info`)
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
  }, [name, api]);

  useEffect(() => {
    async function fetchImg() {
      if (name) {
        const fetched = await api.get(`loginActions/getProfilePic/${name}`);
        const data = await fetched.data
        setProfilePic(data)
      }
    }
    fetchImg()
  }, [name, api]);

  const handleClick = async () => {
    try {
      if (isFollowing) {
        await api.post(`/followingInfo/user/unfollow`, {
          "unfollowThisUser": name
        });
      } else {
        await api.post(`/followingInfo/user/follow`, {
          "followingThisUser": name
        });
      }
      setFollowing(!isFollowing);
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };




  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        <NavBar />
        <StatGrid currentUser={name} imgURL={profilePic} apiCheck={api} />
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg">
            <div className="flex items-center space-x-3">
              <FaUserFriends className="text-gray-400" />
              <span className="text-gray-300">{bio}</span>
            </div>
          </div>
          <button className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg"
            onClick={handleClick}>
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
                viewUser={name}
                isOpen={isPostsOpen}
                onClose={() => setIsPostsOpen(false)}
            />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

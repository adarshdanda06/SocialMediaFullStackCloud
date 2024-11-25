import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import UserInFollow from "./UserInFollow";
import axios from "axios";
import { Link } from "react-router-dom";
import url from "../serverURL";

async function userList(api, user) {
  try {
    const response = await api.get(`/followingInfo/${user}/following`);
    return response.data.map((name, index) => ({ id: index, name: name }));
  } catch (error) {
    console.error('Failed', error.response?.data || error.message);
    return [];
  }
}

function FollowingDashboard({ user, isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });

  useEffect(() => {
    async function fetchUsers() {
      if (isOpen && user) {
        const fetchedUsers = await userList(api, user);
        setUsers(fetchedUsers);
      }
    }
    fetchUsers();
  }, [isOpen, user]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#212121] w-[90%] h-[90%] rounded-3xl p-8 relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-gray-200 text-2xl mb-6">Following</h2>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <div className="grid grid-cols-1 gap-4">
            {users.map(user => (
              <Link 
                key={user.id}
                to={`/userProfile/${user.name}`}
              >
                <UserInFollow name={user.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowingDashboard;
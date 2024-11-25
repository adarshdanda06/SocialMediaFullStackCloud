import React from "react";
import UserCard from "../components/UserCard";
import { FaSearch } from "react-icons/fa";
import NavBar from "../components/NavBar";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import url from "../serverURL";

function ExplorePage() {
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState([])
    
    const api = axios.create({
      baseURL: url, 
      withCredentials: true
    });

    useEffect(() => {
      async function getUsers() {
        const response = await api.get(`/users/${user}/getOtherUsers`);
        const users =  response.data.map((name, index) => ({ id: index, name: name }));
        console.log(users)
        setUserList(users)
      }
      getUsers()
    }, [user])

    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] p-8">
        <div className="w-full bg-[#212121] rounded-[2rem] shadow-2xl p-8">
          <div className="mb-8">
            <NavBar />
          </div>
  
          {/*<div className="relative mb-8 max-w-3xl mx-auto">
            <input 
              type="text"
              placeholder="Search users..."
              className="w-full bg-[#2a2a2a] text-gray-200 px-6 py-3 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>*/}

  
          <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-4 -mr-4">
            <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
              {userList.map(user => (
                <UserCard 
                  key={user.id}
                  username={user.name}
                  imageUrl={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
  
export default ExplorePage;
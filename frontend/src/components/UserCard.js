import React from "react";
import { Link } from "react-router-dom";


function UserCard({ username, imageUrl }) {
    return (
        <div className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-all duration-300 cursor-pointer">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                <h3 className="text-gray-200 font-semibold">{username}</h3>
                <Link 
                  to={`/userProfile/${username}`}
                >
                <button className="mt-2 text-sm bg-[#212121] text-gray-300 px-4 py-1 rounded-full hover:bg-gray-700 transition-colors">
                    View Profile
                </button>
                </Link>
                </div>
            </div>
        </div>);
}

export default UserCard;

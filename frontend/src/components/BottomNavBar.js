import React from "react";
import { useState } from "react";
import PostsDashboard from "./PostDashboard";
import FollowersDashboard from "./FollowersDashboard";
import FollowingDashboard from "./FollowingDashboard";

function BottomNavBar({ user }) {
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);


    return (
        <div className="flex justify-between items-center pt-6 border-t border-[#2a2a2a]">
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsPostsOpen(true)}>Posts</button>
          <PostsDashboard 
                viewUser={user}
                isOpen={isPostsOpen}
                onClose={() => setIsPostsOpen(false)}
            />
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsFollowersOpen(true)}>Followers</button>
          <FollowersDashboard
            user={user}
            isOpen={isFollowersOpen}
            onClose={() => setIsFollowersOpen(false)} />
          <button className="text-gray-400 hover:text-white transition-colors text-sm" onClick={() => setIsFollowingOpen(true)}>Following</button>
          <FollowingDashboard
            user={user}
            isOpen={isFollowingOpen}
            onClose={() => setIsFollowingOpen(false)} />
        </div>
    );
}

export default BottomNavBar;
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <nav className="flex justify-between items-center">
        <div className="flex space-x-8">
          <button className="text-gray-400 hover:text-white transition-colors text-sm">Explore</button>
          <Link to="/createPost">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Create Post</button>
          </Link>
          <Link to="/profile">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Profile</button>
          </Link>
          <Link to="/">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Logout</button>
          </Link>
        </div>
      </nav>
    );
}

export default NavBar;
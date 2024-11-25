import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../UserContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import url from "../serverURL";


function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });

  const handleClick = async (e) => {
    e.preventDefault();
    if (user != null) {
      const response = await api.post(`/loginActions/logout`)
      setUser(null)
      navigate('/')
      
    }
  }
    return(
        <nav className="flex justify-between items-center">
        <div className="flex space-x-8">
          <Link to="/explore">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Explore</button>
          </Link>
          <Link to="/createPost">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Create Post</button>
          </Link>
          <Link to="/profile">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">Profile</button>
          </Link>
          <Link to="/">
            <button className="text-gray-400 hover:text-white transition-colors text-sm"
              onClick={handleClick}>
                Logout
            </button>
          </Link>
        </div>
      </nav>
    );
}

export default NavBar;
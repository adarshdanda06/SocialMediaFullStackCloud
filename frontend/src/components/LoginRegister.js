import React, { useState, useContext } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import url from '../serverURL';

function LoginRegister(){
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const api = axios.create({
    baseURL: "http://localhost:8000", 
    withCredentials: true
  });
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var response;
      if (isLogin) {
        response = await api.post(`/loginActions/login`, {
          username,
          password
        });
      } else {
        response = await api.post(`/loginActions/register`, {
          username,
          password
        });
      }
      if (response && isLogin) {
        const data = response.data;
        if (data.userExists && data.userStatus) {
          setUser(username);
          navigate('/profile');
        } else {
          alert("Invalid credentials");
        }
      }
      if (response && !isLogin) {
        const data = response.data
        if (data.userCreated) {
          setUser(username);
          navigate('/createProfile');
        } else {
          alert("Invalid credentials");
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl w-96 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form className="space-y-4"
        onSubmit={handleSubmit}>

        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 bg-gray-700 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-8 text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={toggleForm}
          className="text-blue-400 hover:underline focus:outline-none transition duration-300"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
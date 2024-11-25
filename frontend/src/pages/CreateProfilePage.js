import React, { useState, useContext } from 'react';
import { FaUpload } from 'react-icons/fa';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import url from '../serverURL';


function CreateProfilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bio, setBio] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const username = "";
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('image')) {
      setSelectedFile(file);
    }
  };
  const api = axios.create({
    baseURL: url, 
    withCredentials: true
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile || !bio.trim()) {
      alert('Please upload a profile picture and fill in your bio to register.');
      return;
    }
    if (!user) {
      alert("Invalid access");
      return;
    }
    try {

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('bio', bio);
      const response = await api.post('loginActions/creatingProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response)
    } catch (error) {
      console.log("Error occured here: " + error);
      console.log(bio)
    }
    navigate('/profile')
    // Proceed with registration logic here
    
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-[#212121] rounded-[2rem] shadow-2xl p-8">
        <div className="flex gap-12">
          {/* Left Column - Welcome and Create Profile Text */}
          <div className="flex-1 flex flex-col justify-start mt-10">
            <h2 className="text-4xl font-bold text-gray-200 mt-10">Welcome,</h2>
            <h3 className="text-3xl text-gray-400 mb-12">{user}</h3>
            <div className="text-6xl font-bold text-gray-200 leading-tight">
              <h1>Create Profile</h1>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <label className="text-gray-300">Profile Picture</label>
              <div className={`transition-all duration-300 ${
                selectedFile 
                  ? 'h-12 bg-[#2a2a2a] rounded-lg' 
                  : 'h-40 bg-[#2a2a2a] rounded-lg'
              }`}>
                {selectedFile ? (
                  <div className="flex items-center justify-center space-x-2 text-gray-300 h-full">
                    <span className="text-sm">Image selected: {selectedFile.name}</span>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      <FaUpload className="w-6 h-6 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold">Upload Profile Picture</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300">Bio</label>
              <textarea 
                className="w-full bg-[#333333] text-white p-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Tell us about yourself..."
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <button className="w-full bg-[#2a2a2a] text-white py-3 rounded-lg hover:bg-[#333333] transition-colors"
              onClick={handleSubmit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
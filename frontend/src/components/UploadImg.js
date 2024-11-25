import React, { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import NavBar from "./NavBar";
import Popup from "./Popup";
import axios from "axios";
import url from "../serverURL";


function UploadImg({ popupText, types, message }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const api = axios.create({
    baseURL: url,
    withCredentials: true
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('image')) {
      setSelectedFile(file);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleReupload = () => {
    setSelectedFile(null);
  };

  const handlePost = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await api.post('postInfo/creatingPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert("Post created successfully!");
      handleReupload();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] p-8 relative">
      <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
        <NavBar />

        <div className="flex flex-col items-center w-full space-y-4">
          <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-md p-4">
            {selectedFile ? (
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <span className="text-sm">Image selected: {selectedFile.name}</span>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-600 rounded-xl cursor-pointer hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <FaUpload className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">{message}</span> 
                  </p>
                  <p className="text-xs text-gray-500">{types}</p>
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

          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handlePost}
            >
              Post
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={handleReupload}
            >
              Reupload
            </button>
          </div>
        </div>
      </div>
      {showSuccess && <Popup message={popupText} />}
    </div>
  );
}

export default UploadImg;
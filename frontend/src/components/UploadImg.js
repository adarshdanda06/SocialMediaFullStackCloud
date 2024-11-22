import React from "react";
import { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import NavBar from "./NavBar";
import Popup from "./Popup";

function UploadImg({ popupText, types, message}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file && file.type.includes('image')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          // Show success message
          setShowSuccess(true);
          // Hide success message after 3 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="min-h-screen w-full bg-[#1a1a1a] p-8 relative">
        {/* Success Popup */}

  
        <div className="max-w-full mx-auto bg-[#212121] rounded-[2rem] shadow-2xl p-8 space-y-8">
            <NavBar />

            <div className="flex justify-center w-full">
                <div className={`transition-all duration-300 ${
                    selectedFile 
                    ? 'h-12 bg-[#2a2a2a] rounded-2xl w-full max-w-md' 
                    : 'h-96 bg-[#2a2a2a] rounded-2xl w-full max-w-md'
                }`}>
                    {selectedFile ? (
                    <div className="flex items-center justify-center space-x-2 text-gray-300 p-2">
                      <div className="flex items-center justify-center space-x-2 text-gray-300 h-full">
                        <span className="text-sm">Image selected: {selectedFile.name}</span>
                      </div>
                    </div>
                    ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-600 rounded-xl cursor-pointer hover:border-gray-400 transition-colors">
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
                        disabled={selectedFile}
                        />
                    </label>
                    )}
                </div>
            </div>
        </div>
      </div>
    );
}

export default UploadImg;
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function Popup({ popupText }) {
    return(<div className="fixed top-4 right-4 bg-[#2a2a2a] text-green-400 px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-down">
        <FaCheckCircle />
        <span>{popupText}</span>
    </div>)
}

export default Popup;
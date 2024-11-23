import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

function EditableField({ label, icon, initialValue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || label);

  useEffect(() => {
    setValue(initialValue || label);
  }, [initialValue, label]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add logic to save the value to your backend if needed
  };

  return (
    <div className="bg-[#2a2a2a] rounded-2xl p-6 hover:bg-[#333333] transition-colors shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon}
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-[#1a1a1a] text-gray-300 px-2 py-1 rounded-lg outline-none"
              autoFocus
            />
          ) : (
            <span className="text-gray-300">{value}</span>
          )}
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
      </div>
    </div>
  );
}

export default EditableField;
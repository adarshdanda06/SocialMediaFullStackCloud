import React, { useState } from 'react';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import UploadImg from '../components/UploadImg';

function CreatePostPage() {
    return (<UploadImg 
        popupText={"Post Successfully Created: Check Post Dashboard"}
        types={"PNG, JPG, or GIF"}
        message={"Click to Upload a Post"}
        />);
};

export default CreatePostPage;
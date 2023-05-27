import React, { useState, useRef } from 'react';
import './ImageUploader.css';
// import fileInputRef from 'react';

const ImageUploader = ({ onImageChange }) => {
    const [imageData, setImageData] = useState('');
    const fileInputRef = useRef(null);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageDataURL = reader.result;
            setImageData(imageDataURL);
            onImageChange(imageDataURL);//pass to parent component
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event
    };

    return (
        <div>
            <div className="custom-file-upload" onClick={handleClick}>
                Upload Image
            </div>
            <input type="file"
                accept='image/*'
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }} />
            {/* {previewImage && <img src={previewImage} alt="Preview" />} */}
        </div>
    );
};

export default ImageUploader;
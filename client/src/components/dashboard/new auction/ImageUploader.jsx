import React, { useState, useRef } from 'react';
import './ImageUploader.css';
import fileInputRef from 'react';

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
            console.log(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger the file input click event

    };

    return (
        <div>
            <div onClick={handleClick}>
                <button type="submit" className="btn text-white bg-blue-500 hover:bg-blue-400 w-full sm:w-auto sm:mb-0 ml-auto">Choose a file</button>
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
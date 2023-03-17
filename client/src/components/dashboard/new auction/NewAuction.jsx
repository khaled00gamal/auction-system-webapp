import React from "react";
import NavBar from "../../essentials/NavBar";
import Footer from "../../landing-page/Footer";
import { useState } from "react";
import "./NewAuction.css"
import Button from "../../essentials/Button";

function NewAuction() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div>
            <NavBar />
            <div className="new-auction-content">
                <div className="item">
                    <div className="item-picture-and-info-wrapper">
                        <div className="item-picture">
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt="item" />
                            ) : (
                                <p>Upload an image</p>
                            )}
                            <input type="file" onChange={handleImageChange} />
                        </div>
                        <div className="item-info-wrapper">
                            <div className="item-name">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <input
                                type="datetime-local"
                                placeholder="End Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <ul>
                        <li>
                            <Button size="medium" text="Back" style="text" link="#" />
                        </li>
                        <li>
                            <Button size="medium" text="Confirm and place item for auction" style="regular" link="#" />
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewAuction;
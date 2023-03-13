import React from "react";
import Button from "./Button";
import "../styles/Card.css";
import { propTypes } from "react-bootstrap/esm/Image";

function Card() {
    return (
        <div className="card-wrapper">
            <div className="image-and-caption-wrapper">
                <div className="image-container">
                    <img className="image" src={props.itemImageLink} />
                </div>
                <p>{props.itemName}</p>
            </div>
            <Button text="khaled" width="276px" size="medium" />
        </div>
    );

}

//TODO: responsive design

export default Card;
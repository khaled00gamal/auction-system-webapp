import React from "react";
import Card from "../essentials/Card";
import "../styles/Carousel.css"
import Button from "./Button";

function Carousel(props) {
    return (
        <div className="carousel-wrapper">
            <div className="title-and-view-all-wrapper">
                <div className="title"><h3>{props.title}</h3></div>
                <div className="view-all"><Button text="View All" size="medium" style="text" link="/"/></div>
            </div>
            <div className="cards-wrapper">
                <Card itemName="item" itemImageLink="https://kelleherstampassets.s3.us-east-2.amazonaws.com/Sales/655/387876.jpg"/>
                <Card itemName="item" itemImageLink="https://kelleherstampassets.s3.us-east-2.amazonaws.com/Sales/655/387876.jpg"/>
                <Card itemName="item" itemImageLink="https://kelleherstampassets.s3.us-east-2.amazonaws.com/Sales/655/387876.jpg"/>
            </div>
        </div>
    );
}

export default Carousel;
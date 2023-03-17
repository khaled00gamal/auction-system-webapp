import React from "react";
import "./Item.css";

function Item() {
    return (
        <div className="item">
            <div className="item-picture-and-info-wrapper">
                <div className="item-picture">
                    <img src="https://www.sidegains.com/wp-content/uploads/2020/02/twitter_profile_image_size.jpg" alt="" />
                </div>
                <div className="item-info-wrapper">
                    <div className="item-name">
                        <h3>Item Name</h3>
                    </div>
                    <p>description</p>
                    <p>Auction ends in: time</p>
                </div>
            </div>

        </div>
    );
}

export default Item;
import React from "react";
import NavBar from "../../essentials/NavBar";
import Footer from "../../landing-page/Footer";
import Button from "../../essentials/Button";
import "./ViewItem.css"

function ViewItem() {
    return (
        <div>
            <NavBar />
            <div className="view-item-content">
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
                <div className="buttons">
                    <ul>
                        <li>
                            <Button size="medium" text="Back" style="text" link="#" />
                        </li>
                        <li>
                            <Button size="medium" text="Place a bid" style="regular" link="#" />
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewItem;
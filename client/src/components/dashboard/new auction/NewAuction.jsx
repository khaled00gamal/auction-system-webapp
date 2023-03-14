import React from "react";
import NavBar from "../../essentials/NavBar";
import Footer from "../../landing-page/Footer";
import Item from "../Item";

function NewAuction() {
    return (
        <div>
            <NavBar />
            <div className="view-item-content">
                <Item />
                <div className="buttons">
                    <ul>
                        <li>
                            <p>back</p>
                        </li>
                        <li>
                            <p>confirm</p>
                        </li>
                    </ul>
                </div>
            </div>
            {//<Footer />
            }
        </div>
    );
}

export default NewAuction;
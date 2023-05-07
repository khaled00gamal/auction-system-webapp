import "../styles/LastSection.css";
import { Link } from "react-router-dom";


function LastSection() {

    return <div id="last-section" >
        <div className="row">
            <div className="last-section-all">
                <p className="bold">With an account you can:</p>
                <ul className="last-section-ul">
                    <li className="bold-li" >TRACK YOUR ACTIVE BIDS</li>
                    <li className="bold-li" >SAVE TO FAVORITES</li>
                    <li className="bold-li">SELL GOODS</li>
                </ul>
                <Link to="signin"><button className="last-section-button">Create account</button></Link>
            </div>
            <div className="last-section-img">
                <img src={require("./images/placeholder.png")} alt="placeholder-img" />
            </div>

        </div>
    </div>
}


export default LastSection;
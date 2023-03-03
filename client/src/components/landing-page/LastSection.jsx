import "../../styles/LastSection.css";


function LastSection() {

    return <div id="last-section" >
        <div className="row">
            <div className="col last-section-ul">
                <p className="bold">With an account you can:</p>
                <ul>
                    <li className="bold-li" >TRACK YOUR ACTIVE BIDS</li>
                    <li className="bold-li" >SAVE TO FAVORITES</li>
                    <li className="bold-li">SELL GOODS</li>
                </ul>
                <button className="last-section-button">Create an account</button>
            </div>
            <div className="last-section-img">
                <img src={require("./images/placeholder.png")} alt="placeholder-img" />
            </div>

        </div>
    </div>
}


export default LastSection;
import "../../styles/LastSection.css";

function LastSection() {
    return <div className="row">
        <div className="col last-section-ul">
            <h3>With an account you can:</h3>
            <ul>
                <li>TRACK YOUR ACTIVE BIDS</li>
                <li>SAVE TO FAVORITES</li>
                <li>SELL GOODS</li>
            </ul>
            <button className="last-section-button">Create an account</button>
        </div>
        <div className="last-section-img">
            <img src={require("./images/placeholder.png")} alt="placeholder-img" />
        </div>

    </div>
}

export default LastSection;
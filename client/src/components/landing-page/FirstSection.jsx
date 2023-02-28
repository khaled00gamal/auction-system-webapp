import NavBar from "./NavBar";
import "../../styles/FirstSection.css";

function FirstSection() {
    return <div>

        <section id="first-section">
            <NavBar />
            <div className="row">
                <div className="col">
                    <h1 className="heading">Buy and sell Securely</h1>
                    <h1 className="heading">with <span className="brand-name">chainAuction</span></h1>
                    <h3 className="sub-heading"><span className="brand-name">chainAuction</span> is a place where you can create auctions, place bets,</h3>
                    <h3 className="sub-heading">and win securely thanks to using blockchain technology.</h3>
                    <button className="heading-button">Browse Auctions</button>
                </div>

                <div className="header-img">
                    <img src="images/header.png" alt="header-img" />
                </div>
            </div>


        </section>
    </div>

}

export default FirstSection;
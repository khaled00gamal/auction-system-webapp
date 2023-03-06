import HowItWorksCard from "./howItWorksCard";
import "../styles/HowItWorksSection.css";
import { Link } from "react-router-dom";

function HowItWorksSection() {
    return <div>
        <h1 style={{ textAlign: "center" }}>
            HOW IT WORKS
        </h1>
        <div className="row how-it-works-section">
            <HowItWorksCard />
            <img className="arrow" src={require("./images/arrow.png")} alt="arrow" />
            <HowItWorksCard />
            <img className="arrow" src={require("./images/arrow.png")} alt="arrow" />
            <HowItWorksCard />
        </div>
        <Link target="_blank" to="https://pontem.network/posts/a-guide-to-blockchain-auctions">
            <h1 style={{ textAlign: "center" }}>
                Learn more
            </h1>
        </Link>
    </div >
}

export default HowItWorksSection;
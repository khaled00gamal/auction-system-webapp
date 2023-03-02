import HowItWorksCard from "./howItWorksCard";
import "../../styles/HowItWorksSection.css";

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
        <h1 style={{ textAlign: "center" }}>
            Learn more
        </h1>
    </div >
}

export default HowItWorksSection;
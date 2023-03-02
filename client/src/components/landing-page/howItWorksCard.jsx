import "../../styles/HowItWorksCard.css";

function HowItWorksCard() {
    return <div className="col">
        <img className="placeholder-img" src={require("./images/placeholder.png")} alt="placeholder-img" />
        <p className="introduction-text">
            lorem epsum lorem epsum loren epum
        </p>
    </div>
}

export default HowItWorksCard;
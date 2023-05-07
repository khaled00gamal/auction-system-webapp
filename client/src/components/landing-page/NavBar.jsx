import "../styles/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {



    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={require("./images/logo.png")} alt="Logo" />
            </div>
            <div className="navbar-buttons">
                <Link to="signin"><button className="navbar-button login">Connect</button></Link>
            </div>
        </nav>
    );
}

export default NavBar;
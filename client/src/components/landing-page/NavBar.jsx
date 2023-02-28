import "../../styles/NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="images/logo.jpg" alt="Logo" />
            </div>
            <div className="navbar-buttons">
                <button className="navbar-button login">Login</button>
                <button className="navbar-button sign-up">Sign up</button>
            </div>
        </nav>
    );
}

export default NavBar;
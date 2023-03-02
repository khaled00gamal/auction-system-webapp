import "../../styles/Footer.css"


function Footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/*col1*/}
                    <div className="col">
                        <ul className="li-style">
                            <li>about</li>
                            <li>News</li>
                        </ul>
                    </div>

                    {/*col2*/}
                    <div className="col">
                        <ul className="li-style">
                            <li>Support</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    {/*col3*/}
                    <div className="col">
                        <ul className="li-style">
                            <li>Contact Us</li>
                            <li>example@example.com</li>
                            <li>+20 xxxxxxx</li>
                        </ul>
                    </div>

                    <div className="website-img">
                        {/*add logo*/}
                        <img src={require("./images/logo.png")} alt="logo" />
                    </div>
                </div>

                <hr className="footer-hr" />

                <ul className="ul-row">
                    <li>PRIVACY POLICY</li>
                    <li>SITE MAP</li>
                    <li >&copy;{new Date().getFullYear()} CHAINAUCTION</li>
                </ul>
                <div />


            </div>
        </div>
    );
}

export default Footer;
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
                            <li>email</li>
                            <li>phone number</li>
                        </ul>
                    </div>

                    <div className="website-img">
                        <img src="../../resources/chainAuction-logo.png" alt="lol"></img>
                    </div>
                </div>
                <hr />

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
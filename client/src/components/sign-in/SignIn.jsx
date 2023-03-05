import "./sign-in styles/SignIn.css";
function SignIn() {
    return (
        <div className="row sign-in">

            <div className="col left-part">
                <div className="logo">
                    <img src={require("../landing-page/images/logo.png")} alt="logo" />
                </div>
                <h1>Welcome Back !</h1>
                <div className="laptop-img">
                    <img src={require("./images/laptop.png")} alt="laptop" />
                </div>
            </div>

            <div className="right-part">
                <h1>i am the right part</h1>
            </div>



        </div>
    )
}


export default SignIn;
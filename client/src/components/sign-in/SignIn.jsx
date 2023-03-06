import "./sign-in styles/SignIn.css";
import { useState, useEffect } from "react";



function SignIn() {

    // const [walletAddress, setWalletAddress] = useState("");


    // async function requestAccount() {
    //     console.log("requesting account");

    //     //check if metamask exists
    //     if (window.ethereum) {
    //         console.log("detected");
    //         try {
    //             const accounts = await window.ethereum.request({
    //                 method: "eth_requestAccounts"
    //             });
    //             setWalletAddress(accounts[0]);
    //         } catch (e) {
    //             console.log("error while connecting" + { e });
    //         }
    //     } else {
    //         alert("please Download MetaMask Extension");
    //     }
    // }

    // async function connectWallet(){
    //     if(typeof window.ethereum !== "undefined"){
    //         await requestAccount();

    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     }
    // }




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
                <button className="connect-metaMask-button">Connect metaMask account</button>
            </div>
        </div>
    )
}


export default SignIn;
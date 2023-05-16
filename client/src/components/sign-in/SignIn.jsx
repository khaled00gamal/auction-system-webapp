import "./sign-in styles/SignIn.css";
import ConnectWalletButton from "./ConnectWalletButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import axios from "axios";
import logo from "../icons/logo-navbar-white.svg";
import { contract } from "../../contract";






async function testContractFunction() {
    console.log(await contract.getNumberOfRegisteredAuctions());
    // try {
    //     const res = await contract.methods.getNumberOfRegisteredAuctions().call();
    //     console.log('result:', res);
    // } catch (e) {
    //     console.error('error:', e);
    // }
}


testContractFunction();


const firebaseConfig = {
    apiKey: "AIzaSyAmUJ4vSaWAfUV6xxyT9O5jvBdrmYtBSCA",
    authDomain: "chainauction.firebaseapp.com",
    projectId: "chainauction",
    storageBucket: "chainauction.appspot.com",
    messagingSenderId: "259962252882",
    appId: "1:259962252882:web:42e079564a610f32aeb98b",
    measurementId: "G-EEQ6MMVCTY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignIn() {

    const [isConnected, setIsConnected] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (address) => {
        const baseUrl = "http://localhost:3000";
        const response = await axios.get(`${baseUrl}/message?address=${address}`);
        const messageToSign = response?.data?.messageToSign;

        if (!messageToSign) {
            throw new Error("Invalid message to sign");
        }

        const web3 = new Web3(Web3.givenProvider);
        const signature = await web3.eth.personal.sign(messageToSign, address);

        const jwtResponse = await axios.get(
            `${baseUrl}/jwt?address=${address}&signature=${signature}`
        );

        const customToken = jwtResponse?.data?.customToken;

        if (!customToken) {
            throw new Error("Invalid JWT");
        }

        await signInWithCustomToken(auth, customToken);
        setAddress(address);
        setIsConnected(true);

    };

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");


    const onPressConnect = async () => {
        setLoading(true);

        try {
            if (window.ethereum.isMetaMask) {
                // Desktop browser
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);
                await handleLogin(account);
                console.log(account);
            }
        } catch (error) {
            console.log(error);
            setAddress("");
        }

        setLoading(false);
    };

    const onPressLogout = () => {
        setAddress("");
        signOut(auth);
    };

    return (
        <div className="connect-page">
            <div className="connect-page__logo">
                <img src={logo} alt="" />
            </div>
            <div className="col text-center">
                <h1>Connect Now</h1>
                <p>Connect your MetaMask wallet to place bids,set <br />up Auctions and more.</p>
                <ConnectWalletButton
                    onPressConnect={onPressConnect}
                    onPressLogout={onPressLogout}
                    loading={loading}
                    address={address}
                />
                {isConnected ? (
                    <button className="go-to-dashboard-button" onClick={() => navigate(`/dashboard/${address}`)}>Go to Dashboard</button>
                ) : null}
            </div>
        </div>
    )
}


export default SignIn;
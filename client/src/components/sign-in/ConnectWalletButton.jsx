import "../sign-in/sign-in styles/SignIn.css";

const ConnectWalletButton = ({
    onPressLogout,
    onPressConnect,
    loading,
    address,
}) => {
    return (
        <div className="right-part">
            {address && !loading ? (
                <button onClick={onPressLogout} className="connect-metaMask-button">
                    Disconnect
                </button>
            ) : loading ? (
                <button
                    className="connect-metaMask-button connect-loading"
                    disabled
                >
                    <div>Loading...</div>
                </button>
            ) : (
                <button onClick={onPressConnect} className="connect-metaMask-button">
                    Connect Wallet
                </button>
            )}
        </div>
    )
}

export default ConnectWalletButton;
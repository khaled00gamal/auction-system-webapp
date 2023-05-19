import '../sign-in/sign-in styles/SignIn.css';

const ConnectWalletButton = ({
  onPressLogout,
  onPressConnect,
  loading,
  connected,
}) => {
  console.log('connected', connected);
  console.log('loading', loading);
  return (
    <div className='row'>
      <div className='connect-metaMask-button'>
        {/* <img src={metamaskLogo} alt="" /> */}
        {connected ? (
          <button onClick={onPressLogout} className='connect-metaMask-button'>
            Disconnect
          </button>
        ) : loading ? (
          <button className='connect-metaMask-button connect-loading' disabled>
            <div>Loading...</div>
          </button>
        ) : (
          <button onClick={onPressConnect} className='connect-metaMask-button'>
            Connect Wallet
          </button>
        )}
        {/* {!loading ? (
                    <button onClick={onPressLogout} className="connect-metaMask-button">Disconnect</button>
                ) : loading ? (
                    <button className="connect-metaMask-button connect-loading" disabled>
                        <div>Loading...</div>
                    </button>
                ) : (
                    <button onClick={onPressConnect} className="connect-metaMask-button">Connect Wallet</button>
                )} */}
      </div>
    </div>
  );
};

export default ConnectWalletButton;

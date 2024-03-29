// styling
import './sign-in styles/SignIn.css';
import ConnectWalletButton from './ConnectWalletButton';
import logo from '../icons/logo-navbar-white.svg';

// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// web3
import { useWeb3 } from '../../high-order components/Web3Provider';

function SignIn() {
  // UI state variables
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const web3Context = useWeb3();

  const onPressConnect = async () => {
    setLoading(true);
    await web3Context.connect();
    // web3Context.hooks.getAccount();
    setLoading(false);
    setIsConnected(true);
  };

  const onPressLogout = async () => {
    // TEST
    // console.log(
    //   'num',
    //   await web3Context.contract.methods.getNumberOfRegisteredAuctions().call(),
    // );
    try {
      // Inform the user that they need to disconnect manually from Metamask
      console.log('Please disconnect from Metamask manually.');
    } catch (error) {
      console.error('Error opening Metamask:', error);
    }
  };

  return (
    <div className='connect-page'>
      <div className='connect-page__logo'>
        <img src={logo} alt='' />
      </div>
      <div className='col text-center'>
        <h1>Connect Now</h1>
        <p>
          Connect your MetaMask wallet to place bids, set <br />
          up auctions and more.
        </p>
        <ConnectWalletButton
          onPressConnect={onPressConnect}
          onPressLogout={onPressLogout}
          loading={loading}
          connected={isConnected}
        />
        {isConnected ? (
          <button
            className='go-to-dashboard-button'
            onClick={() => navigate('/Dashboard')}
          >
            Go to Dashboard
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SignIn;

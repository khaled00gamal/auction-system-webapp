import React, { useEffect, useState } from 'react';
import Footer from '../landing-page/Footer';
import NavBar from '../essentials/NavBar';
import TrendingAuctionsSection from './TrendingAuctionsSection';
import Card from '../essentials/Card';
import './Dashboard.css';
import { useWeb3 } from '../../high-order components/Web3Provider';

function Dashboard() {
  const web3Context = useWeb3();
  const [account, setAccount] = useState('');
  const [activeAuctions, setActiveAuctions] = useState([]);
  

  useEffect(() => {

    web3Context.hooks.getAccount().then((acc) => {
      setAccount(acc);

      web3Context.contract.methods.getActiveAuctions().call({ from: acc }).then((auctions) => {
        setActiveAuctions(auctions);
      })
    });
  }, [web3Context]);
  

  return (
    <div className='dashboard-wrapper'>
      <NavBar />
      <div className='dashboard-content'>
        <h2>Welcome Back, {account}</h2>

        <h2>Active Auctions:</h2>
        <div className='auction-cards'>
          {activeAuctions.map((auction) => (
            <Card
              key={auction.auctionId}
              imgHash={auction.itemPicture}
              auctionTitle={auction.itemName}
              auctionId={auction.auctionId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

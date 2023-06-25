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

  // useEffect(() => {
    web3Context.hooks.getAccount().then((acc) => {
      setAccount(acc);
      web3Context.contract.methods
        .getActiveAuctions()
        .call({ from: acc })
        .then((auctions) => {
          // auctions.forEach((auction) => {
          //   try {
          //     const imgHash = uploadingToInfura(auction.itemPicture);
          //     auction.img = imgHash;
          //   } catch (e) {
          //     console.log(e);
          //   } //call infura on img hash.then((res)=>{auction.img=res})
          // })
          // setActiveAuctions(auctions);
        });
    });
  // });

  // console.log("printing active auctions");
  // console.log(activeAuctions);



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
              itemImageLink={auction.itemPicture}
              itemName={auction.itemName}
              itemId={auction.auctionId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

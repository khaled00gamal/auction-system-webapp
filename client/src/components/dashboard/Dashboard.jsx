import React, { useEffect, useState } from 'react';
import Footer from '../landing-page/Footer';
import NavBar from '../essentials/NavBar';
import { useWeb3 } from '../../high-order components/Web3Provider';
import Button from '../essentials/Button.jsx';
import { Link } from 'react-router-dom';
import Card from '../essentials/Card.jsx';

function Dashboard() {
  const web3Context = useWeb3();
  const [account, setAccount] = useState('');
  const [activeAuctions, setActiveAuctions] = useState([]);
  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  function handleAccountsChanged(accounts) {
    window.location.reload();
  }

  useEffect(() => {

    web3Context.hooks.getAccount().then((acc) => {
      setAccount(acc);

      web3Context.contract.methods.getAuctionsByState(0).call({ from: acc }).then((auctions) => {
        setActiveAuctions(auctions);
      })
    });
  }, [web3Context]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <NavBar />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-28 md:pb-20">
              {/* Section header */}
              <div className="text-left pb-12 md:pb-16">
                <h3 className="text-base md:text-lg leading-tighter tracking-tighter" data-aos="zoom-y-out">Welcome back {account}</h3>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Active Auctions</h3>
                <div className="flex flex-wrap justify-start">
                  {activeAuctions.map((auction) => (
                    <div key={auction.auctionId} className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow mb-4 mr-5">
                      <Card
                        key={auction.auctionId}
                        imgHash={auction.itemPicture}
                        auctionTitle={auction.itemName}
                        auctionId={auction.auctionId}
                      />
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
          <Footer />
        </div>


      </section>
    </div>
  );
}

export default Dashboard;

// {/* <div className="max-w-3xl">
//                   {/* <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">chainAuction is a place where
//                     you can create auctions, place bids, and win securely thanks to using blockchain technology.</p> */}
//                   <div className="max-w-xs sm:max-w-none sm:flex " data-aos="zoom-y-out" data-aos-delay="300">
//                     {/* { <div className='auction-cards'>
//                       {activeAuctions.map((auction) => (
//                         <Card
//                           key={auction.auctionId}
//                           imgHash={auction.itemPicture}
//                           auctionTitle={auction.itemName}
//                           auctionId={auction.auctionId}
//                         />
//                       ))}
//                     </div> } */}
                    
//                   </div>
//                 </div> */}
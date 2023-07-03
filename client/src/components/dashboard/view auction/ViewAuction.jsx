import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import Button from '../../essentials/Button';
import { useState , useEffect} from 'react';

import './ViewAuction.css';
import { useWeb3 } from '../../../high-order components/Web3Provider';
import { useParams } from 'react-router-dom';




function ViewAuction() {
  const [bid, setBid] = useState('');
  const { auctionId } = useParams();
  const [auctionInfo , setAuctionInfo] = useState('');
  const [account, setAccount] = useState('');
  const web3Context = useWeb3();
  const currentTime = new Date();

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
    console.log('WEB3', web3Context)
    web3Context.hooks.getAccount().then((address) => {
      setAccount(address)
      console.log('brefore calling')
      web3Context.contract.methods.getAuctionData(auctionId).call({ from: address }).then((auction) => {
        console.log('after calling')

        setAuctionInfo(auction.userSet)
        // NOTE: why send all auction data, if only userSet is used?
        
      })
    })
    
   
  }, [web3Context])
  const auctionDate = new Date(auctionInfo.biddingEndDate * 1000)
  const dateString = auctionDate.toUTCString();
  const handleBidChange = (e) => {
    setBid(e.target.value);
  };
  const placeBid = async (e) => {
    const address = await web3Context.hooks.getAccount();
    // const info = {
    //   auctionId: auctionId,
    //   bid: bid
    // };
    console.log("this is auction id" , parseInt(auctionId))
    console.log("this is bid" , parseInt(bid))
    const res = web3Context.contract.methods.placeBid(parseInt(auctionId), parseInt(bid)).send({ from: address, value: auctionInfo.securityDeposit });
    
    res.then((res) => { console.log(res) }).catch((err) => { console.log(err) });
    console.log("lol");
  };
  


  return (
    <div>
      <NavBar />
      <div className='view-item-content'>
        <div className='item'>
          <div className='item-picture-and-info-wrapper'>
            <div className='item-picture'>
              <img
                src='https://www.sidegains.com/wp-content/uploads/2020/02/twitter_profile_image_size.jpg'
                alt=''
              />
            </div>
            <div className='item-info-wrapper'>
              <div className='item-name'>
                <h3>Auction Name:{auctionInfo.itemName}</h3>
              </div>
              <p>{auctionInfo.itemDesc}</p>
              <p>Auction ends in: {dateString}</p>
            </div>
          
            <div>
              {auctionDate.getTime() > currentTime.getTime() && auctionInfo.seller !== account ? (
                <div className="input-field-group">
                  <label>Enter bid amount: </label>
                  <input
                    id="place-bid-input"
                    type="number"
                    placeholder="place your bid"
                    value={bid}
                    onChange={handleBidChange}
                  />
                </div>
              ) : null}
            </div>
            {auctionDate.getTime() < currentTime.getTime() && auctionInfo.seller !== account ?(
            
            <div>


                <p>Reveal Phase! Auction has ended.</p>
                <form class="file-upload-form">
                  <label for="file-upload" class="file-upload-label">Select a file to upload:</label>
                  <input type="file" id="file-upload" name="file-upload" class="file-upload-input" />
                  <input type="submit" value="Upload" class="file-upload-submit" />
                </form>
            </div>
            ) : null}
          </div>
        </div>
        <div className='buttons'>
          <ul>
            <li>
              <Button size='medium' text='Back' style='text' link={`/Dashboard`} />
            </li>
            <li>
              <Button
                size='medium'
                text='Place a bid'
                style='regular'
                link='#'
                onclick={placeBid}
              />
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewAuction;

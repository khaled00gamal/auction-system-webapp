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
  const web3Context = useWeb3();
  useEffect(() => {
    console.log('WEB3', web3Context)
    web3Context.hooks.getAccount().then((address) => {
      console.log('brefore calling')
      web3Context.contract.methods.getAuctionData(auctionId).call({ from: address }).then((auction) => {
        console.log('after calling')

        setAuctionInfo(auction.userSet)
        
      })
    })
    
   
  }, [web3Context])
  const currentDate = new Date(auctionInfo.biddingEndDate * 1000)
  const dateString = currentDate.toUTCString();
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
    const res = web3Context.contract.methods.placeBid(parseInt(auctionId), parseInt(bid)).send({ from: address });
    
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
            <div className="input-field-group">
                <label>Enter bid amount: </label>
                <input
                    id = "place-bid-input"
                    type='number'
                    placeholder='place your bid'
                    value={bid}
                    onChange={handleBidChange}
                    //todo disable button when seller = address
                />
            </div>
          </div>
        </div>
        <div className='buttons'>
          <ul>
            <li>
              <Button size='medium' text='Back' style='text' link='#' />
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

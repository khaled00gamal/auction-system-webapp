import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import Item from '../Item';
import { useState } from 'react';
import Button from '../../essentials/Button';
import BiddingItem from './BiddingItem'
import './Bidding.css';

function Bidding() {
  return (
    <div>
      <NavBar />
      <div className='view-item-content'>
        <BiddingItem />
        <div className='place-bid-input'>
          {/* <label>enter bid amount: </label> */}
          {/* <input
            type='text'
            placeholder='place your bid'
            value={bid}
            onChange={handleBidChange}
          /> */}
        </div>
        <div className='button-group'>
          <ul>
            <li>
              <Button size='medium' text='Back' style='regular' link='/' />
            </li>
            <li>
              <Button size='medium' text='Place a bid' style='regular' link='/' />
            </li>
          </ul>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Bidding;

import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import Item from '../Item';
import { useState } from 'react';

function Bidding() {
  const [bid, setBid] = useState('');

  const handleBidChange = (e) => {
    setBid(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className='view-item-content'>
        <Item />
        <div className='place-bid-input'>
          <label>enter bid amount: </label>
          <input
            type='text'
            placeholder='place your bid'
            value={bid}
            onChange={handleBidChange}
          />
        </div>

        <div className='buttons'>
          <ul>
            <li>
              <p>back</p>
            </li>
            <li>
              <p>place a bid</p>
            </li>
          </ul>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Bidding;

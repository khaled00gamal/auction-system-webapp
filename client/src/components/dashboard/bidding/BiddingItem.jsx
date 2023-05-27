import React from "react";
import './BiddingItem.css';
import { useState } from 'react';


function BiddingItem(props) {
    const [bid, setBid] = useState('');

    const handleBidChange = (e) => {
      setBid(e.target.value);
    };

    return (
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
              <h3>{props.itemName}</h3>
            </div>
            <p>{props.itemDescription}</p>
            <p>Auction ends on: {props.endDate}</p>
            <div className="input-field-group">
                <label>Enter bid amount: </label>
                <input
                    id = "place-bid-input"
                    type='number'
                    placeholder='place your bid'
                    value={bid}
                    onChange={handleBidChange}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default BiddingItem;
  
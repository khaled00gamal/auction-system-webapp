import React from 'react';
import './Item.css';

function Item(props) {
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
        </div>
      </div>
    </div>
  );
}

export default Item;

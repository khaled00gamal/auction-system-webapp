import React from 'react';
import Carousel from '../essentials/Carousel';
import './YourBidsSection.css';

function YourBidsSection() {
  return (
    <div className='your-bids-wrapper' style={{ maxWidth: '1283px' }}>
      <Carousel title='Your Bids' />
    </div>
  );
}

export default YourBidsSection;

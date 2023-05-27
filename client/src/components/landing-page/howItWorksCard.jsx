import React from 'react';
import '../styles/HowItWorksCard.css';

function HowItWorksCard(props) {
  const imagePath = require(`./images/${props.image}`);

  return (
    <div className='col-how-it-works'>
      <img
        className='placeholder-img'
        src={imagePath}
        alt='placeholder-img'
      />
      <p className='introduction-text'>{props.text}</p>
    </div>
  );
}

export default HowItWorksCard;

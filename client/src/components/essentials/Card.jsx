import React from 'react';
import Button from './Button';
import '../styles/Card.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import { IPFS_BASE_URL } from '../../contants';

function Card(props) {
  return (
    <div className='card-wrapper'>
      <div className='image-and-caption-wrapper'>
        <div className='image-container'>
          <img className='image' src={`${IPFS_BASE_URL}${props.itemImageLink}`} alt='' />
        </div>
        <p>{props.itemName}</p>
      </div>
      <Button
        text='View'
        width='276px'
        size='medium'
        style='regular'
        link={`/item/${props.itemId}`}
      />
    </div>
  );
}

//TODO: responsive design

export default Card;

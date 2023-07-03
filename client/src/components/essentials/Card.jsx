import React, { useEffect, useState } from 'react';
import Button from './Button';
import '../styles/Card.css';
import { propTypes } from 'react-bootstrap/esm/Image';

//FIXME: refactor ipfs api

function Card({auctionId, auctionTitle, imgHash}) {
  const [image, setImage] = useState();
  console.log(auctionTitle)
  useEffect(() => {
    try {
      const ipfsClient = create({
        url: 'https://ipfs.infura.io:5001/api/v0',
        headers: {
          authorization: process.env.REACT_APP_INFURA_AUTHORIZATION,
        },

      });

      const df = ipfsClient.get(imgHash)
      console.log('got:', df)
      // .then((img) => {
      //   console.log('image', img);
      //   setImage(img);
      // })

    } catch (error) {
      console.error('IPFS error', error);
    }
    
  }, []);
  return (
    <div className='card-wrapper'>
      <div className='image-and-caption-wrapper'>
        <div className='image-container'>
          <img className='image' src={image} alt='' />
        </div>
        <p>{auctionTitle}</p>
      </div>
      <Button
        text='View'
        width='276px'
        size='medium'
        style='regular'
        link={`/Dashboard/viewauction/${auctionId}`} //TODO
      />
    </div>
  );
}

//TODO: responsive design

export default Card;

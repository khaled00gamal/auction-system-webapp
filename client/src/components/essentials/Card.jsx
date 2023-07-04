import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import '../styles/Card.css';
import { propTypes } from 'react-bootstrap/esm/Image';

//FIXME: refactor ipfs api

function Card({ auctionId, auctionTitle, imgHash, imgsrc }) {
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
      .then((img) => {
        console.log('image', img);
        setImage(img);
      })

    } catch (error) {
      console.error('IPFS error', error);
    }
  }, []);

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg ">
      <Link to={`/Dashboard/viewauction/${auctionId}`}>
        <a className="block">
          <div className="aspect-w-4 aspect-h-3 pb-3">
            <img className="object-cover rounded-t-lg" src={image} alt="product image" />
          </div>
        </a>
      </Link>
      <div className="px-4 pb-4">
        <Link to={`/Dashboard/viewauction/${auctionId}`}>
          <a>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">{auctionTitle}</h5>
          </a>
          <a>
            <p className="text-base font-normal tracking-tight text-gray-900 pb-4">Description Descrip tion Descr iption Desc ription Description Descript ion Description </p>
          </a>
        </Link>

        <div className="flex items-center justify-between">
          <div className="ml-auto">
            <Link to={`/Dashboard/viewauction/${auctionId}`}>
              <a className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center">View auction</a>
            </Link>
          </div>
        </div>
      </div>
    </div>



    //  <div className='card-wrapper'>
    //   <div className='image-and-caption-wrapper'>
    //     <div className='image-container'>
    //       <img className='image' src={image} alt='' />
    //     </div>
    //     <p>{auctionTitle}</p>
    //   </div>
    //   <Button
    //     text='View'
    //     width='276px'
    //     size='medium'
    //     style='regular'
    //     link={`/Dashboard/viewauction/${auctionId}`} //TODO
    //   />
    // </div> 
  );
}

//TODO: responsive design

export default Card;

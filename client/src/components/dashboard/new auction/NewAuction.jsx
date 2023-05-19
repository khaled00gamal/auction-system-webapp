import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import { useState } from 'react';
import './NewAuction.css';
import Button from '../../essentials/Button';
// import { contract } from "../../../contract";

function NewAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    const val = new Date(e.target.value).getTime() * 1000;
    console.log(val);
    setEndDate(val);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const createAuction = (e) => {
    console.log('creating!!!');
    const address = '0x66cD0Cc5Ea1e2002F221528e2ed4a099f44ba56D';
    // const info = {
    //     seller: address,
    //     minimumPrice: 2,
    //     endDate: 1683669600,
    //     itemName: title,
    //     itemDesc: description
    // };

    const info = {
      seller: address,
      securityDeposit: 1,
      biddingStart: 1680904800,
      revealStart: 1683583200,
      revealEnd: 1683669600,
      itemName: title,
      itemDesc: description,
    };
    // FIXME contract.createAuction(info);
  };

  return (
    <div>
      <NavBar />
      <div className='new-auction-content'>
        <div className='item'>
          <div className='item-picture-and-info-wrapper'>
            <div className='item-picture'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt='item' />
              ) : (
                <p>Upload an image</p>
              )}
              <input type='file' onChange={handleImageChange} />
            </div>
            <div className='item-info-wrapper'>
              <div className='item-name'>
                <input
                  type='text'
                  placeholder='Title'
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <textarea
                placeholder='Description'
                value={description}
                onChange={handleDescriptionChange}
              />
              <input
                type='datetime-local'
                placeholder='Start Date'
                value={startDate}
                onChange={handleStartDateChange}
              />
              <input
                type='datetime-local'
                placeholder='End Date'
                value={endDate}
                onChange={handleEndDateChange}
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
                onclick={createAuction}
                size='medium'
                text='Confirm and place item for auction'
                style='regular'
                link='#'
              />
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewAuction;

import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import { useState } from 'react';
import './NewAuction.css';
import Button from '../../essentials/Button';
import { useWeb3 } from '../../../high-order components/Web3Provider';
import DatePicker from "react-datepicker";
import ImageUploader from './ImageUploader';
import './dropDown.css';

import "react-datepicker/dist/react-datepicker.css";

//TODO: add validation for minimum price field
//TODO: add style for date picker


function NewAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [signPeriod, setSignPeriod] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [image, setImage] = useState('');
  let securityDeposit = minPrice / 2;

  const web3Context = useWeb3();

  const DropdownMenu = () => {

    const handleSignPeriodChange = (e) => {
      setSignPeriod(e.target.value);
    }

    return (
      <div className='dropdown'>
        <label htmlFor="dropdown" className="dropdown-label">Select confirmation deadline:    </label>
        <select id="dropdown"
          value={signPeriod}
          onChange={handleSignPeriodChange}
          className='dropdown-select'>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        {signPeriod && <p>confirmation deadline: {signPeriod} day/s</p>}
      </div>
    );
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleImageChange = (imageData) => {
    setImage(imageData);
  };

  const createAuction = async (e) => {
    const address = await web3Context.hooks.getAccount();

    const info = {
      //todo: add auction id
      seller: address,
      securityDeposit: securityDeposit,
      minPrice: minPrice,
      endDate: endDate,
      signPeriod: signPeriod,
      itemName: title,
      itemDesc: description,
      image: image
    };

    console.log(info);
    //await web3Context.contract.methods.createAuction(info).send({ from: address });
    console.log("lol");
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className='new-auction-content'>
        <div className='item'>
          <div className='item-picture-and-info-wrapper'>

            <div className="item-picture">
              <ImageUploader onImageChange={handleImageChange} />
              {image && (
                <div>
                  <p className='image-text'>Image Preview :</p>
                  <img src={image} alt="Selected" />
                </div>
              )}
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
              <div className='description'>

                <textarea
                  placeholder='Description'
                  value={description}
                  onChange={handleDescriptionChange}

                />
              </div>

              <div className='date-picker'>

                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="Pp"
                  placeholderText="Select date"
                  minDate={new Date()}
                  className="custom-datepicker"
                />
                {endDate && (
                  <p>Selected Date and Time: {endDate.toString()}</p>
                )}
              </div>
              <div className='min-price-input'>
                <input
                  type='text'
                  placeholder='Minimum Price'
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  style={{
                    fontSize: '2rem', // Adjust the font size as desired
                  }}
                />
              </div>

              <DropdownMenu />

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

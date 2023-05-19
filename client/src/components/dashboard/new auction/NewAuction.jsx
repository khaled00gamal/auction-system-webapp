import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import { useState } from 'react';
import './NewAuction.css';
import Button from '../../essentials/Button';
import { useWeb3 } from '../../../high-order components/Web3Provider';


function NewAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [signPeriod, setSignPeriod] = useState('');

  const web3Context = useWeb3();

  const DropdownMenu = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    return (
      <div>
        <label htmlFor="dropdown">Select a number:</label>
        <select id="dropdown" value={selectedValue} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        {selectedValue && <p>You selected: {selectedValue}</p>}
      </div>
    );
  };


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

  const handleSignPeriodChange = (e) => {
    setSignPeriod(e.target.value);
    console.log(signPeriod);
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const createAuction = async (e) => {
    const address = await web3Context.hooks.getAccount();
    console.log(address);
    // const info = {
    //     seller: address,
    //     minimumPrice: 2,
    //     endDate: 1683669600,
    //     itemName: title,
    //     itemDesc: description,
    //     signPeriod: selectedValue
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
    await web3Context.contract.methods.createAuction(info).send({ from: address });
    console.log("lol");
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
                <p>add an image</p>
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
                placeholder='End Date'
                value={endDate}
                onChange={handleEndDateChange}
              />
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

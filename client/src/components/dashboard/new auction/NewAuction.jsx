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
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
import { IPFS_BASE_URL } from '../../../contants';


// const projectId = process.env.PROJECT_ID;
// const projectSecret = process.env.PROJECT_SECRET;

const projectId = '2QLhGGUgQODTNGtYY0KiT2xCiqO';
const projectSecret = 'd4f4cc97d6089911fafdaf2f1fd08339';
const authorization = 'Basic ' + btoa(`${projectId}:${projectSecret}`);



import "react-datepicker/dist/react-datepicker.css";

//TODO: add validation for minimum price field
//TODO: add style for date picker
//FIXME: store image on infura only on submit  (not on image change)
//FIXME: configure security deposit


function NewAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [signPeriod, setSignPeriod] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [image, setImage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  // const [error, setError] = useState('');
  const [ipfs, setIpfs] = useState(undefined);
  const [base64img, setBase64img] = useState('');

  React.useEffect(() => {
    try {
      const ipfsClient = create({
        url: 'https://ipfs.infura.io:5001/api/v0',
        headers: {
          authorization,
        },

      });
      setIpfs(ipfsClient);
    } catch (error) {
      console.error('IPFS error', error);
      setIpfs(null);
    }
  }, []);


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

  const formatEndDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const formattedDateObject = new Date(formattedDate);
    const dateUnixTimeStamp = Math.floor(formattedDateObject.getTime() / 1000);

    return dateUnixTimeStamp;
  };

  const getConfirmationDate = () => {
    let confirmationDate = new Date(endDate);
    confirmationDate.setDate(confirmationDate.getDate() + parseInt(signPeriod));

    const year = confirmationDate.getFullYear();
    const month = String(confirmationDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(confirmationDate.getDate()).padStart(2, '0');
    const hours = String(confirmationDate.getHours()).padStart(2, '0');
    const minutes = String(confirmationDate.getMinutes()).padStart(2, '0');
    const seconds = String(confirmationDate.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const formattedDateObject = new Date(formattedDate);
    const dateUnixTimeStamp = Math.floor(formattedDateObject.getTime() / 1000);

    return dateUnixTimeStamp;
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value));
    //TODO: Validate if the input is a number

  };

  const uploadImgToInfura = async (imageData) => {
    try {
      if (!ipfs) {
        throw new Error('IPFS not initialized');
      }

      const options = {
        pin: true,
      };

      const ipfsResponse = await ipfs.add(imageData, options);

      const uploadedHash = ipfsResponse.path;
      console.log('Image uploaded to IPFS. IPFS hash:', uploadedHash);

      return uploadedHash;


    } catch (e) {
      console.log('Error uploading image to IPFS', e);
      throw e;
    }

  }

  const handleImageChange = async (imageData) => {
    setImage(imageData);
    setBase64img(imageData);

  };

  const createAuction = async (e) => {
    e.preventDefault();
    if (base64img === '') {
      alert('Please upload an image');
      return;
    };
    const address = await web3Context.hooks.getAccount();
    const hash = uploadImgToInfura(base64img);

    const info = {
      //todo: add auction id
      seller: address,
      securityDeposit: securityDeposit,
      minimumPrice: minPrice,
      biddingEndDate: formatEndDate(endDate),
      confirmationEndDate: getConfirmationDate(),
      itemName: title,
      itemDesc: description,
      itemPicture: hash,
    };

    console.log(info);

    const res = web3Context.contract.methods.createAuction(info).send({ from: address });
    res.then((res) => { console.log(res) }).catch((err) => { console.log(err) });

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
                  <img src={base64img}
                    alt="Selected"
                    style={{ maxWidth: '400px', margin: '15px' }}
                    onError={(e) => {
                      console.log('Failed to load image:', e.target.src);
                    }} />
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
                {/* {error && <p className="error-message">{error}</p>} */}
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
                disabled={base64img == ''}
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

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
// import { IPFS_BASE_URL } from '../../../contants';
import Datepicker from "react-tailwindcss-datepicker";
import { CalendarIcon } from '@heroicons/react/outline';


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
    console.log(date)
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

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setMinPrice(value);
    }
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
            
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <div class="w-72">
                    <div class="relative h-10 w-full min-w-[200px]">
                      <input
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        value={title}
                        onChange={handleTitleChange}
                      />
                      <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                      </label>
                    </div>
                  </div>
                  {/* <div class="relative w-full min-w-[200px]">
                    <textarea
                      class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={description}
                      onChange={handleDescriptionChange}
                    ></textarea>
                    <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Description
                    </label>
                  </div> */}




                  <div class="w-96">
                    <div class="relative w-full min-w-[200px]">
                      <textarea
                        class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        value={description}
                        onChange={handleDescriptionChange}
                      ></textarea>
                      <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Description
                      </label>
                    </div>
                  </div>
{/* 
                  <div className="max-w-sm relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <input
                      type="date"
                      className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Select date"
                      selected={endDate}
                      onChange={handleEndDateChange}
                    />
                  </div> */}

                  <div className="max-w-sm relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <input
                      type="date"
                      className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      placeholder="Select date"
                      value={endDate ? endDate.toISOString().substr(0, 10) : ''}
                      onChange={(event) => {
                        handleEndDateChange(new Date(event.target.value));
                      }}
                      min={new Date()}
                    />
                    {endDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Selected Date: {endDate.toDateString()}
                      </p>
                    )}
                    
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



                  <div class="w-72">
                    <div class="relative h-10 w-full min-w-[200px]">
                      <input
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        pattern="\d*"
                      />
                      <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Minimum Price
                      </label>
                    </div>
                  </div>




                </div>
              </form>


                





              {/* <div className='date-picker'>

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
              </div> */}
              {/* <div className='min-price-input'>
                <input
                  type='text'
                  placeholder='Minimum Price'
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  style={{
                    fontSize: '2rem', // Adjust the font size as desired
                  }}
                />
                {error && <p className="error-message">{error}</p>}
              </div> */}

              {/* <DropdownMenu /> */}








              {/* 
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
                {error && <p className="error-message">{error}</p>}
              </div>  */}

              <DropdownMenu />

            </div>
          </div>
        </div>
        <div className='buttons'>
          <ul>
            <li>
              <Button size='medium' text='Back' style='text' link={`/Dashboard`}/>
            </li>
            <li>
              <Button
                onclick={createAuction}
                size='medium'
                text='Confirm and place item for auction'
                style='regular'
                link={`/Dashboard`}
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

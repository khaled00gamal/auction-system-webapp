import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import { useState, useEffect } from 'react';
import './NewAuction.css';
import Button from '../../essentials/Button';
import { useWeb3 } from '../../../high-order components/Web3Provider';
import DatePicker from 'react-datepicker';
import ImageUploader from './ImageUploader';
import './dropDown.css';
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client';
// import { IPFS_BASE_URL } from '../../../contants';
import Datepicker from 'react-tailwindcss-datepicker';
import { CalendarIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

// const projectId = process.env.PROJECT_ID;
// const projectSecret = process.env.PROJECT_SECRET;

const projectId = '2QLhGGUgQODTNGtYY0KiT2xCiqO';
const projectSecret = 'd4f4cc97d6089911fafdaf2f1fd08339';
const authorization = 'Basic ' + btoa(`${projectId}:${projectSecret}`);

import 'react-datepicker/dist/react-datepicker.css';

//TODO: add validation for minimum price field
//TODO: add style for date picker
//FIXME: store image on infura only on submit  (not on image change)
//FIXME: configure security deposit

function NewAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revealEndDate, setRevealEndDate] = useState('');
  const [sortingEndDate, setSortingEndDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [image, setImage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  // const [error, setError] = useState('');
  const [ipfs, setIpfs] = useState(undefined);
  const [base64img, setBase64img] = useState('');
  const [fileOneContents, setfileOneContents] = useState(null);
  const [fileTwoContents, setfileTwoContents] = useState(null);

  useEffect(() => {
    console.log('Selected file:', fileOneContents);
  }, [fileOneContents]);

  const handleFileChangeOne = (event) => {
    const file = event.target.files[0];
    console.log('jjjj');

    let reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      console.log('data', contents);
      setfileOneContents(contents);
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    console.log('Selected file:', fileTwoContents);
  }, [fileTwoContents]);

  const handleFileChangeTwo = (event) => {
    const file = event.target.files[0];
    console.log('jjjj');

    let reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      console.log('data', contents);
      setfileTwoContents(contents);
    };

    reader.readAsArrayBuffer(file);
  };

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

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  function handleAccountsChanged(accounts) {
    window.location.reload();
  }

  const web3Context = useWeb3();

  const DropdownMenuRevealEndDate = () => {
    const handleRevealEndDateChange = (e) => {
      setRevealEndDate(e.target.value);
    };

    return (
      <div className='dropdown'>
        <label htmlFor='dropdown' className='dropdown-label'>
          Select reveal deadline:{' '}
        </label>
        <select
          id='dropdown'
          value={revealEndDate}
          onChange={handleRevealEndDateChange}
          className='dropdown-select'
        >
          <option value=''>Select</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
        </select>
        {revealEndDate && <p>confirmation deadline: {revealEndDate} day/s</p>}
      </div>
    );
  };


  const DropdownMenuSortingEndDate = () => {
    const handleSortingEndDateChange = (e) => {
      setSortingEndDate(e.target.value);
    };

    return (
      <div className='dropdown'>
        <label htmlFor='dropdown' className='dropdown-label'>
          Select sorting deadline:{' '}
        </label>
        <select
          id='dropdown'
          value={sortingEndDate}
          onChange={handleSortingEndDateChange}
          className='dropdown-select'
        >
          <option value=''>Select</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
        </select>
        {sortingEndDate && <p>confirmation deadline: {sortingEndDate} day/s</p>}
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
    console.log(date);
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

  const getRevealingEndDate = () => {
    let confirmationDate = new Date(endDate);
    confirmationDate.setDate(confirmationDate.getDate() + parseInt(revealEndDate));

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
  };



  const getSortingEndDate = () => {
    let confirmationDate = new Date(endDate);
    confirmationDate.setDate(confirmationDate.getDate() + parseInt(sortingEndDate));

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
  };

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
  };

  const handleImageChange = async (imageData) => {
    setImage(imageData);
    setBase64img(imageData);
  };

  function downloadStringAsFile(str, filename) {
    // Create a Blob from the string
    const blob = new Blob([str], { type: 'text/plain' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element with the URL
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Simulate a click event to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  function encodeFileContentsForContract(contents) {
    return (
      '0x' +
      Array.from(new Uint8Array(contents))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    );
  }

  function downloadContractBytesAsFile(bytes, filename) {
    bytes = bytes.split('x')[1];
    bytes = new Uint8Array(
      bytes.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
    ).buffer;
    downloadStringAsFile(bytes, filename);

    // example code

    // const address = await web3Context.hooks.getAccount();
    // const testme = encodeFileContentsForContract(fileOneContents);
    // web3Context.contract.methods
    //   .setTestme(testme)
    //   .send({ from: address })
    //   .then(() => {
    //     web3Context.contract.methods
    //       .getTestme()
    //       .call({ from: address })
    //       .then((r) => downloadContractBytesAsFile(r, 'r.dat'));
    //   });
  }

  const createAuction = async (e) => {
    e.preventDefault();
    if (base64img === '') {
      alert('Please upload an image');
      return;
    }
    const hash = uploadImgToInfura(base64img);
    const address = await web3Context.hooks.getAccount();
    const info = {
      owner: address,
      // FIXME
      params: encodeFileContentsForContract(fileOneContents),
      owner_pkey: encodeFileContentsForContract(fileTwoContents),
      itemName: title,
      itemDesc: description,
      itemPicture: hash,
      minimumPrice: minPrice,
      securityDeposit: securityDeposit,
      biddingEndDate: formatEndDate(endDate),
      revealingEndDate: getRevealingEndDate(),
      sortingEndDate: getSortingEndDate(),
    };

    console.log(info);

    const res = web3Context.contract.methods
      .createAuction(info)
      .send({ from: address, value: securityDeposit });
      res
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('lol');
  };

  return (
    <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
      <NavBar />
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-28 md:pb-20'>
              {/* Section header */}
              <div className='text-left pb-12 md:pb-16'>
                <h3
                  className='text-3xl md:text-4xl font-semibold leading-tighter tracking-tighter mb-4'
                  data-aos='zoom-y-out'
                >
                  Create a New Auction
                </h3>
                <div className='flex flex-wrap bg-gray-100 rounded-xl p-8'>
                  <form className='flex items-center w-full'>
                    <div className='w-1/3 flex justify-center'>
                      {/* First div content */}
                      <div className='mx-auto flex flex-col items-center'>
                        <label
                          className='block mb-2 text-sm font-medium text-gray-900'
                          htmlFor='user_avatar'
                        >
                          Upload picture
                        </label>

                        <ImageUploader onImageChange={handleImageChange} />

                        {image && (
                          <div>
                            <img
                              src={base64img}
                              alt='Selected'
                              style={{ maxWidth: '400px', margin: '15px' }}
                              onError={(e) => {
                                console.log(
                                  'Failed to load image:',
                                  e.target.src,
                                );
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='w-1/2'>
                      {/* Second div content */}
                      <div className='mb-6'>
                        <label
                          htmlFor='name'
                          className='block mb-2 text-sm font-medium text-gray-900'
                        >
                          Item Name
                        </label>
                        <input
                          type='name'
                          id='name'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5'
                          placeholder='Your item name goes here'
                          required
                          value={title}
                          onChange={handleTitleChange}
                        />
                      </div>

                      <div className='mb-6'>
                        <label
                          htmlFor='description'
                          className='block mb-2 text-sm font-medium text-gray-900'
                        >
                          Description
                        </label>
                        <textarea
                          id='message'
                          rows='4'
                          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          placeholder='Your item description goes here'
                          value={description}
                          onChange={handleDescriptionChange}
                        />
                      </div>

                      <div className='mb-6'>
                        <div className='max-w-sm relative'>
                          <label
                            htmlFor='date'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Auction End Date
                          </label>
                          <input
                            type='date'
                            className=' border bg-gray-50 border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5'
                            placeholder='Select date'
                            value={
                              endDate ? endDate.toISOString().substr(0, 10) : ''
                            }
                            onChange={(event) => {
                              handleEndDateChange(new Date(event.target.value));
                            }}
                            min={new Date()}
                          />
                          {endDate && (
                            <p className='text-sm text-gray-800 mt-1'>
                              Selected End Date: {endDate.toDateString()}
                            </p>
                          )}
                        </div>
                        <div className='date-picker'>
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat='Pp'
                            placeholderText='Select date'
                            minDate={new Date()}
                            className='custom-datepicker'
                          />
                          {endDate && (
                            <p>Selected Date and Time: {endDate.toString()}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className='w-72 mb-6'>
                          <label
                            htmlFor='date'
                            className='block mb-2 text-sm font-medium text-gray-900'
                          >
                            Minimum Price
                          </label>
                          <input
                            className='peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                            placeholder=' '
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            pattern='\d*'
                          />
                        </div>
                      </div>

                      <DropdownMenuRevealEndDate />
                      <DropdownMenuSortingEndDate />
                      {/* <Link to="/Dashboard">
                        <button type="submit" className="btn text-white bg-blue-500 hover:bg-blue-400 w-full sm:w-auto sm:mb-0 ml-auto" onclick={createAuction} >Submit</button>
                      </Link> */}
                      <div className='buttons'>
                        <ul className='flex'>
                          <li>
                            <Button
                              size='medium'
                              text='Back'
                              style='text'
                              link={`/Dashboard`}
                            />
                          </li>
                          <li>
                            <Button
                              onclick={createAuction}
                              size='medium'
                              text='Confirm and place item for auction'
                              style='regular'
                              // link={`/Dashboard`}
                              disabled={base64img == ''}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  <label htmlFor='file' className='file'>
                    <input
                      type='file'
                      id='file'
                      aria-label='File browser example'
                      onChange={handleFileChangeOne}
                    />
                    <span className='file-custom'>Choose File</span>
                  </label>
                </div>
                <div>
                  <label htmlFor='file' className='file'>
                    <input
                      type='file'
                      id='file'
                      aria-label='File browser example'
                      onChange={handleFileChangeTwo}
                    />
                    <span className='file-custom'>Choose File</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default NewAuction;

// <div className="page-container">
//   <NavBar />
//   <div className='new-auction-content'>
//     <div className='item'>
//       <div className='item-picture-and-info-wrapper'>

//         <div className="item-picture">
//           <ImageUploader onImageChange={handleImageChange} />

//           {image && (
//             <div>
//               <p className='image-text'>Image Preview :</p>
//               <img src={base64img}
//                 alt="Selected"
//                 style={{ maxWidth: '400px', margin: '15px' }}
//                 onError={(e) => {
//                   console.log('Failed to load image:', e.target.src);
//                 }} />
//             </div>
//           )}
//         </div>

//         <div className='item-info-wrapper'>

//           <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
//             <div className="mb-4 flex flex-col gap-6">
//               <div className="w-72">
//                 <div className="relative h-10 w-full min-w-[200px]">
//                   <input
//                     className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//                     placeholder=" "
//                     value={title}
//                     onChange={handleTitleChange}
//                   />
//                   <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                     Title
//                   </label>
//                 </div>
//               </div>
//               {/* <div className="relative w-full min-w-[200px]">
//                     <textarea
//                       className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
//                       placeholder=" "
//                       value={description}
//                       onChange={handleDescriptionChange}
//                     ></textarea>
//                     <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                       Description
//                     </label>
//                   </div> */}

//               <div className="w-96">
//                 <div className="relative w-full min-w-[200px]">
//                   <textarea
//                     className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
//                     placeholder=" "
//                     value={description}
//                     onChange={handleDescriptionChange}
//                   ></textarea>
//                   <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                     Description
//                   </label>
//                 </div>
//               </div>
//               {/*
//                   <div className="max-w-sm relative">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <CalendarIcon className="w-5 h-5 text-blue-500" />
//                     </div>
//                     <input
//                       type="date"
//                       className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
//                       placeholder="Select date"
//                       selected={endDate}
//                       onChange={handleEndDateChange}
//                     />
//                   </div> */}

//               <div className="max-w-sm relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <CalendarIcon className="w-5 h-5 text-blue-500" />
//                 </div>
//                 <input
//                   type="date"
//                   className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
//                   placeholder="Select date"
//                   value={endDate ? endDate.toISOString().substr(0, 10) : ''}
//                   onChange={(event) => {
//                     handleEndDateChange(new Date(event.target.value));
//                   }}
//                   min={new Date()}
//                 />
//                 {endDate && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Selected Date: {endDate.toDateString()}
//                   </p>
//                 )}

//               </div>
//               <div className='date-picker'>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={handleEndDateChange}
//                   dateFormat="Pp"
//                   placeholderText="Select date"
//                   minDate={new Date()}
//                   className="custom-datepicker"
//                 />
//                 {endDate && (
//                   <p>Selected Date and Time: {endDate.toString()}</p>
//                 )}

//               </div>

//               <div className="w-72">
//                 <div className="relative h-10 w-full min-w-[200px]">
//                   <input
//                     className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
//                     placeholder=" "
//                     value={minPrice}
//                     onChange={handleMinPriceChange}
//                     pattern="\d*"
//                   />
//                   <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
//                     Minimum Price
//                   </label>
//                 </div>
//               </div>

//             </div>
//           </form>

//           <DropdownMenu />

//         </div>
//       </div>
//     </div>
//     <div className='buttons'>
//       <ul>
//         <li>
//           <Button size='medium' text='Back' style='text' link={`/Dashboard`} />
//         </li>
//         <li>
//           <Button
//             onclick={createAuction}
//             size='medium'
//             text='Confirm and place item for auction'
//             style='regular'
//             link={`/Dashboard`}
//             disabled={base64img == ''}
//           />
//         </li>
//       </ul>
//     </div>
//   </div>
//   <Footer />
// </div>
//   );
// }

// export default NewAuction;

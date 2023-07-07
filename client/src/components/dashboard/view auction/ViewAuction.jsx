import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import Button from '../../essentials/Button';
import { useState, useEffect } from 'react';

import './ViewAuction.css';
import { useWeb3 } from '../../../high-order components/Web3Provider';
import { useParams } from 'react-router-dom';

function ViewAuction() {
  const { auctionId } = useParams();
  const [auctionInfo, setAuctionInfo] = useState('');
  const [account, setAccount] = useState('');
  const [fileCContents, setFileCContents] = useState(null);
  const [fileDContents, setFileDContents] = useState(null);
  const [auctionDate, setAuctionDate] = useState();
  const [dateString, setDateString] = useState();
  const [fileRevealContents, setFileRevealContents] = useState(null);
  const [isBidder, setIsBidder] = useState(false);
  const [revealingDate, setRevealingDate] = useState();
  const [sortingDate, setSortingDate] = useState();

  const web3Context = useWeb3();
  const currentTime = new Date();

  const handleFileChange = (setFileContents) => {
    return (event) => {
      const file = event.target.files[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        setFileContents(contents);
      };

      reader.readAsArrayBuffer(file);
    };
  };

  const handleFileChangeReveal = (event) => {
    setRevealFile(event.target.files[0]);
  };

  // function downloadStringAsFile(str, filename) {
  //   const blob = new Blob([str], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // }

  // for reveal

  // function downloadContractBytesAsFile(bytes, filename) {
  //   console.log("auction info" , auctionInfo)
  //   bytes = bytes.split('x')[1];
  //   bytes = new Uint8Array(
  //     bytes.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
  //   ).buffer;
  //   downloadStringAsFile(bytes, filename);
  // };

  function encodeFileContentsForContract(contents) {
    return (
      '0x' +
      Array.from(new Uint8Array(contents))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    );
  }

  useEffect(() => {
    // handle account change
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  function handleAccountsChanged() {
    window.location.reload();
  }

  useEffect(() => {
    // set account, set auction info
    // window.ethereum.on('connect', () => {
    web3Context.hooks.getAccount().then((address) => {
      setAccount(address);
      web3Context.contract.methods
        .getAuctionInfo(auctionId)
        .call({ from: address })
        .then((info) => {
          setAuctionInfo(info);
          const d = new Date(info.biddingEndDate * 1000);
          const c = new Date(info.revealingEndDate * 1000);
          const b = new Date(info.sortingEndDate * 1000);
          setAuctionDate(d);
          setRevealingDate(c);
          setSortingDate(b);
          setDateString(d.toUTCString());
          web3Context.contract.methods
            .didNotPlaceABid(auctionId, address)
            .call({ from: address })
            .then((is) => setIsBidder(is));
        });
      // });
    });
  }, [web3Context]);

  const placeBid = async (e) => {
    console.log(
      'placeBid',
      parseInt(auctionId),
      encodeFileContentsForContract(fileCContents),
      encodeFileContentsForContract(fileDContents),
    );
    console.log('sending', {
      from: account,
      value: auctionInfo.securityDeposit,
    });
    const res = web3Context.contract.methods
      .placeBid(
        parseInt(auctionId),
        encodeFileContentsForContract(fileCContents),
        encodeFileContentsForContract(fileDContents),
      )
      .send({ from: account, value: auctionInfo.securityDeposit });
  };
  const revealBid = async (e) => {
    const res = web3Context.contract.methods
      .revealBid(
        parseInt(auctionId),
        encodeFileContentsForContract(fileRevealContents),
      )
      .send({ from: account });
  };

  return (
    <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
      <NavBar />
      {auctionInfo && auctionDate ? (
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
                    View Auction
                  </h3>
                  <div className='flex flex-wrap rounded-xl '>
                    <form className='flex items-center w-full'>
                      <div className='w-1/3 flex justify-center'>
                        {/* First div content */}
                        <div className='mx-auto flex flex-col items-center pr-8'>
                          <img
                            src='https://www.sidegains.com/wp-content/uploads/2020/02/twitter_profile_image_size.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='w-1/2'>
                        {/* Second div content */}
                        <div className='mb-6'>
                          <h3>{auctionInfo.itemName}</h3>
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='description'
                            className='block mb-2 text-sm font-bold text-gray-900'
                          >
                            About this item
                          </label>
                          <p
                            id='message'
                            rows='4'
                            className='block w-full text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Your item description goes here'
                          >
                            {auctionInfo.itemDesc}
                          </p>
                        </div>

                        <div className='mb-6'>
                          <div className='max-w-sm relative'>
                            <p
                              htmlFor='date'
                              className='block mb-2 text-sm font-bold text-gray-900'
                            >
                              Bidding ends at:{' '}
                              <span className='font-normal'>{dateString}</span>
                            </p>
                          </div>
                        </div>

                        {/* <div>
                        <div className="w-72 mb-6">
                          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Minimum Price</label>
                        </div>
                      </div> */}

                        <div>
                          {auctionDate.getTime() > currentTime.getTime() &&
                          auctionInfo.owner !== account &&
                          isBidder ? (
                            <div className='input-field-group mb-6'>
                              <div>
                                <label htmlFor='file' className='file'>
                                  <input
                                    type='file'
                                    id='file'
                                    aria-label='File browser example'
                                    onChange={handleFileChange(
                                      setFileCContents,
                                    )}
                                  />
                                  <span className='file-custom'>
                                    Choose File
                                  </span>
                                </label>
                              </div>
                              <div>
                                <label htmlFor='file' className='file'>
                                  <input
                                    type='file'
                                    id='file'
                                    aria-label='File browser example'
                                    onChange={handleFileChange(
                                      setFileDContents,
                                    )}
                                  />
                                  <span className='file-custom'>
                                    Choose File
                                  </span>
                                </label>
                              </div>
                              {/* <li>
                            <Button
                              onclick={placeBid}
                              size='medium'
                              text='Submit Files'
                              style='regular'
                              // link={`/Dashboard`}
                            />
                          </li> */}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <ul className='flex flex-center'>
                            <li>
                              <Button
                                size='medium'
                                text='Back'
                                style='text'
                                link={`/Dashboard`}
                              />
                            </li>
                            {/* <li>
                            <Button size='medium' text='Download' style='text' link={`/Dashboard`} onclick={downloadContractBytesAsFile(auctionInfo.params, "key")}/>
                          </li>
                           */}
                            {auctionDate.getTime() > currentTime.getTime() &&
                            auctionInfo.owner !== account &&
                            isBidder ? (
                              <li>
                                <Button
                                  size='medium'
                                  text='Place bid'
                                  style='regular'
                                  link='#'
                                  onclick={placeBid}
                                />
                              </li>
                            ) : null}
                            {auctionDate.getTime() > currentTime.getTime() &&
                            revealingDate.getTime() < currentTime.getTime() &&
                            isBidder ? (
                              <div>
                                <div>
                                  <p>Reveal Phase! Auction has ended.</p>
                                  <div>
                                    <label htmlFor='file' className='file'>
                                      <input
                                        type='file'
                                        id='file'
                                        aria-label='File browser example'
                                        onChange={handleFileChange(
                                          setFileRevealContents,
                                        )}
                                      />
                                      <span className='file-custom'>
                                        Choose File
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <li>
                                  <Button
                                    size='medium'
                                    text='Place bid'
                                    style='regular'
                                    link='#'
                                    onclick={revealBid}
                                  />
                                </li>
                              </div>
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </section>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default ViewAuction;
// return (
//     <div>
//       <NavBar />
//       <div className='view-item-content'>
//         <div className='item'>
//           <div className='item-picture-and-info-wrapper'>
//             <div className='item-picture'>
//               <img
//                 src='https://www.sidegains.com/wp-content/uploads/2020/02/twitter_profile_image_size.jpg'
//                 alt=''
//               />
//             </div>
//             <div className='item-info-wrapper'>
//               <div className='item-name'>
//                 <h3>Auction Name:{auctionInfo.itemName}</h3>
//               </div>
//               <p>{auctionInfo.itemDesc}</p>
//               <p>Auction ends in: {dateString}</p>
//             </div>

//             <div>
//               {auctionInfo.seller !== account ? (
//                 <div className="input-field-group">
//                   <label>Enter bid amount: </label>
//                   <input
//                     id="place-bid-input"
//                     type="number"
//                     placeholder="place your bid"
//                     value={bid}
//                     onChange={handleBidChange}
//                   />
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//         <div className='buttons'>
//           <ul>
//             <li>
//               <Button size='medium' text='Back' style='text' link={`/Dashboard`} />
//             </li>
//             <li>
//               <Button
//                 size='medium'
//                 text='Place a bid'
//                 style='regular'
//                 link='#'
//                 onclick={placeBid}
//               />
//             </li>
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React from 'react';
import NavBar from '../../essentials/NavBar';
import Footer from '../../landing-page/Footer';
import Button from '../../essentials/Button';
import { useState , useEffect} from 'react';

import './ViewAuction.css';
import { useWeb3 } from '../../../high-order components/Web3Provider';
import { useParams } from 'react-router-dom';




function ViewAuction() {
  const [bid, setBid] = useState('');
  const { auctionId } = useParams();
  const [auctionInfo , setAuctionInfo] = useState('');
  const [account, setAccount] = useState('');
  const web3Context = useWeb3();

  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  function handleAccountsChanged(accounts) {
    window.location.reload();
  }

  useEffect(() => {
    console.log('WEB3', web3Context)
    web3Context.hooks.getAccount().then((address) => {
      setAccount(address)
      console.log('brefore calling')
      web3Context.contract.methods.getAuctionData(auctionId).call({ from: address }).then((auction) => {
        console.log('after calling')

        setAuctionInfo(auction.userSet)
        // NOTE: why send all auction data, if only userSet is used?
        
      })
    })
    
   
  }, [web3Context])
  const currentDate = new Date(auctionInfo.biddingEndDate * 1000)
  const dateString = currentDate.toUTCString();
  const handleBidChange = (e) => {
    setBid(e.target.value);
  };
  
  const placeBid = async (e) => {
    const address = await web3Context.hooks.getAccount();
    // const info = {
    //   auctionId: auctionId,
    //   bid: bid
    // };
    console.log("this is auction id" , parseInt(auctionId))
    console.log("this is bid" , parseInt(bid))
    const res = web3Context.contract.methods.placeBid(parseInt(auctionId), parseInt(bid)).send({ from: address, value: auctionInfo.securityDeposit });
    
    res.then((res) => { console.log(res) }).catch((err) => { console.log(err) });
    console.log("lol");
  };
  


  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <NavBar />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-28 md:pb-20">
              {/* Section header */}
              <div className="text-left pb-12 md:pb-16">
                <h3 className="text-3xl md:text-4xl font-semibold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">View Auction</h3>
                <div className="flex flex-wrap rounded-xl ">
                  <form className="flex items-center w-full">
                    <div className="w-1/3 flex justify-center">
                      {/* First div content */}
                      <div className="mx-auto flex flex-col items-center pr-8">
                        <img
                          src='https://www.sidegains.com/wp-content/uploads/2020/02/twitter_profile_image_size.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      {/* Second div content */}
                      <div className="mb-6">
                      <h3>{auctionInfo.itemName}</h3>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-bold text-gray-900">About this item</label>
                        <p id="message" rows="4" className="block w-full text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500" placeholder="Your item description goes here"
                        >{auctionInfo.itemDesc}</p>
                      </div>

                      <div className='mb-6'>
                        <div className="max-w-sm relative">
                          <p htmlFor="date" className="block mb-2 text-sm font-bold text-gray-900">Auction ends at: <span className='font-normal'>{dateString}</span></p>
                        </div>
                      </div>

                      <div>
                        <div className="w-72 mb-6">
                          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Minimum Price</label>
                        </div>
                      </div>

                      <div>
                        {auctionInfo.seller !== account ? (
                          <div className="input-field-group mb-6">
                            <label>Enter bid amount: </label>
                            <input type="number" id="place-bid-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                              placeholder="place your bid"
                              value={bid}
                              onChange={handleBidChange}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <ul className='flex flex-center'>
                          <li>
                            <Button size='medium' text='Back' style='text' link={`/Dashboard`} />
                          </li>
                          <li>
                          <Button
                            size='medium'
                            text='Place bid'
                            style='regular'
                            link='#'
                            onclick={placeBid}
                          />
                          </li>
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

// export default ViewAuction;

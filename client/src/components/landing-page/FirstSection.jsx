// import NavBar from './NavBar';
// import '../styles/FirstSection.css';
// import './LastSection';
// import Button from '../essentials/Button.jsx';

// function FirstSection() {
//   return (
//     <div>
//       <section id='first-section-landing'>
//         <NavBar />
//         <div className='row-landing'>
//           <div className='col-landing'>
//             <h1 className='heading-landing'>Buy and Sell Securely</h1>
//             <h1 className='heading-landing'>
//               with <span className='brand-name'>chainAuction</span>
//             </h1>
//             <h3 className='sub-heading-landing'>
//               <span className='brand-name'>chainAuction</span> is a place where
//               you can create auctions,<br />place bids, and win securely thanks to using blockchain<br />technology.
//             </h3>
//             <button className='heading-button-landing'><h4>Browse Auctions</h4></button>
//           </div>

//           <div>
//             <img
//               className='header-img-landing'
//               src={require('./images/header.png')}
//               alt='header-img'
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default FirstSection;

import NavBar from './NavBar';
//import '../styles/FirstSection.css';
import './LastSection';
import Button from '../essentials/Button.jsx';
import { Link } from 'react-router-dom';

function FirstSection() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Illustration behind hero content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
          <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">{/* Hero content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Buy and sell securely with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">chainAuction</span></h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">chainAuction is a place where
                  you can create auctions, place bids, and win securely thanks to using blockchain technology.</p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <div>
                    <Link to='signin'>
                      <a className="btn text-white bg-blue-500 hover:bg-blue-400 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Browse Auctions</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>



      </div>
    </section>

  );
}

export default FirstSection;

// import React from 'react';
// import Button from './Button';
// import SearchBar from './SearchBar';
// import logo from '../icons/logo-navbar.svg';
// import notification from '../icons/notification-36x36.svg';
// import profile from '../icons/profile-36x36.svg';
// import '../styles/NavBarComponent.css';
// import { Link } from 'react-router-dom';

// function NavBar() {
//   return (
//     <nav className='nav-bar'>
//       <div className='logo-and-search-wrapper'>
//         <img src={logo} alt='logo' />
//         <SearchBar />
//       </div>
//       <ul className='navigation'>
//         <Link to='newauction'>
//           {' '}
//           <Button size='medium' text='Sell Items' style='regular' link={`/Dashboard/newauction`} />
//         </Link>
//         <img src={notification} alt='notifications' />
//         <img src={profile} alt='notifications' />
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;

import Logo from '../icons/logo.jsx';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar() {
  const [top, setTop] = useState(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <div>
                    <Link to='newauction'>
                      <a className="btn text-white bg-blue-500 hover:bg-blue-400 w-full sm:w-auto sm:mb-0" href="#0">Sell Items</a>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>

          </nav>


        </div>
      </div>
    </header>
  );
}

export default NavBar;

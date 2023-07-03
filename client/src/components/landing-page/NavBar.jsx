// //import '../styles/NavBar.css';
// import { Link } from 'react-router-dom';
// //import Button from '../essentials/Button.jsx';

// function NavBar() {
//   return (
//     <nav className='navbar'>
//       <div className='navbar-logo'>
//         <img src={require('./images/logo.png')} alt='Logo' />
//       </div>
//       <div className='navbar-buttons'>
//         <Link to='signin'>
//           <Button
//             text='Connect'
//             size='medium'
//             style='regular'
//           />
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;

import Logo from './logo.jsx';
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
                    <Link to='signin'>
                      <a className="btn text-white bg-blue-500 hover:bg-blue-400 w-full sm:w-auto sm:mb-0" href="#0">Connect</a>
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
import React from 'react';
import '../styles/Footer.css';
import logo from '../icons/logo-navbar-white.svg';

function Footer() {
  return (
    <footer>
      <div className='content'>
        <div className='link-boxes'>
          <ul className='box'>
            <li className='link_name'>Company</li>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>News</a>
            </li>
            <li>
              <a href='#'>FAQ</a>
            </li>
            <li>
              <a href='#'>Support</a>
            </li>
          </ul>
          <ul className='box'>
            <li className='link_name'>Services</li>
          </ul>
          <ul className='box'>
            <li className='link_name'>Contact Us</li>
            <li>email@email.com</li>
            <li>telephone</li>
          </ul>
          <ul className='box'>
            <li className='link_name'>Account</li>
          </ul>
        </div>
        <div className='top'>
          <div className='logo-details'>
            <span className='logo_name'>
              <img src={logo} alt='logo' />
            </span>
          </div>
        </div>
      </div>
      <div className='bottom-details'>
        <div className='bottom_text'>
          <span>
            <a>PRIVACY POLICY</a>
          </span>
          <span>
            <a>SITEMAP</a>
          </span>
          <span className='copyright_text'>
            <a>&copy;{new Date().getFullYear()} CHAINAUCTION</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

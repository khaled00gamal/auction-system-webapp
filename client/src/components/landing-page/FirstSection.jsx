import NavBar from './NavBar';
import '../styles/FirstSection.css';
import './LastSection';
import Button from '../essentials/Button.jsx';

function FirstSection() {
  return (
    <div>
      <section id='first-section-landing'>
        <NavBar />
        <div className='row-landing'>
          <div className='col-landing'>
            <h1 className='heading-landing'>Buy and Sell Securely</h1>
            <h1 className='heading-landing'>
              with <span className='brand-name'>chainAuction</span>
            </h1>
            <h3 className='sub-heading-landing'>
              <span className='brand-name'>chainAuction</span> is a place where
              you can create auctions,<br />place bids, and win securely thanks to using blockchain<br />technology.
            </h3>
            <button className='heading-button-landing'><h4>Browse Auctions</h4></button>
          </div>

          <div>
            <img
              className='header-img-landing'
              src={require('./images/header.png')}
              alt='header-img'
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default FirstSection;

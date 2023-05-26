import '../styles/LastSection.css';
import { Link } from 'react-router-dom';
import Button from '../essentials/Button';

function LastSection() {
  return (
    <div id='last-section'>
      <div className='row-last-section'>
        <div className='last-section-all'>
          <h1>With an account you can:</h1>
          <ul className='last-section-ul'>
            <li className='bold-li'>TRACK YOUR ACTIVE BIDS</li>
            <li className='bold-li'>SAVE TO FAVORITES</li>
            <li className='bold-li'>SELL GOODS</li>
          </ul>
          <Link to='signin'>
            <Button
              text='Create Account'
              size='extra-large'
              style='regular'
              color='pink'
            />
            {/* <button className='last-section-button'>Create account</button> */}
          </Link>
        </div>
        <div className='last-section-img'>
          <img
            src={require('./images/placeholder.png')}
            alt='placeholder-img'
          />
        </div>
      </div>
    </div>
  );
}

export default LastSection;

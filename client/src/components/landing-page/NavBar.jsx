import '../styles/NavBar.css';
import { Link } from 'react-router-dom';
import Button from '../essentials/Button.jsx';

function NavBar() {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <img src={require('./images/logo.png')} alt='Logo' />
      </div>
      <div className='navbar-buttons'>
        <Link to='signin'>
          <Button
            text='Connect'
            size='medium'
            style='regular'
          />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;

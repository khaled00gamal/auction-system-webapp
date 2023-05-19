import React from 'react';
import '../styles/SearchBar.css';
import search from '../icons/search.svg';

function SearchBar() {
  return (
    <div className='wrapper'>
      <div className='search_box'>
        <input type='text' className='input_search' placeholder='Search' />
        <div className='search_btn'>
          <img src={search} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

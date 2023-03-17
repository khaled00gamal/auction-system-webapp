// import React from "react";
// import "../styles/SearchBar.css";
// import search from "../icons/search.svg"

// function SearchBar() {
//   return (
//     <div class="wrapper">
//       <div class="search_box">
//         <input type="text" class="input_search" placeholder="Search" />
//         <div class="search_btn"><img src={search} /></div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;

import React from "react";
import "../styles/SearchBar.css";
import search from "../icons/search.svg"

function SearchBar() {
  return (
    <div class="wrapper">
      <div class="search_box">
        <input type="text" class="input_search" placeholder="Search" />
        <div class="search_btn"><img src={search} /></div>
      </div>
    </div>
  );
}

export default SearchBar;

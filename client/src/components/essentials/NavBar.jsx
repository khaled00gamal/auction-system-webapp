import React from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
import logo from "../icons/logo-navbar.svg";
import notification from "../icons/notification-36x36.svg";
import profile from "../icons/profile-36x36.svg";
import "../styles/NavBarComponent.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo-and-search-wrapper">
        <img src={logo} alt="logo" />
        <SearchBar />
      </div>
      <ul className="navigation">
        <Button size="medium" text="Sell Items" style="regular" link="/" />
        <img src={notification} alt="notifications" />
        <img src={profile} alt="notifications" />
      </ul>
    </nav>
  );
}

export default NavBar;
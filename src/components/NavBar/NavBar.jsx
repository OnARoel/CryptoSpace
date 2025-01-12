import React from "react";
import "./NavBar.css";
import logo from "../../assets/crypto-logo.svg";
import icon from "../../assets/arrow.svg";

const NavBar = () => {
  return (
    <div className="NavBar">
      <img src={logo} className="logo" alt="" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <button>
          Sign Up{" "}
          <img src={icon}></img>
        </button>
      </div>
    </div>
  );
};

export default NavBar;

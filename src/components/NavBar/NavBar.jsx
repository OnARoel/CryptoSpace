import React, { createContext, useContext } from "react";
import "./NavBar.css";
import logo from "../../assets/crypto-logo.svg";
import icon from "../../assets/arrow.svg";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { setCurrency } = useContext(CoinContext);

  const rowContext = createContext();

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "USD":
        setCurrency({ name: "USD", symbol: "$" });
        break; // Add break to prevent fall-through
      case "CAD":
        setCurrency({ name: "CAD", symbol: "$" });
        break; // Add break to prevent fall-through
      case "EUR":
        setCurrency({ name: "EUR", symbol: "€" });
        break; // Add break to prevent fall-through
      default:
        setCurrency({ name: "USD", symbol: "$" });
    }
  };

  return (
    <div className="NavBar">
      <Link to={"/"}>
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <button>
          Sign Up <img src={icon}></img>
        </button>
        <select>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        <span>Rows</span>
      </div>
    </div>
  );
};

export default NavBar;

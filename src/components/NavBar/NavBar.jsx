// src/components/NavBar/NavBar.jsx
import React, { useContext } from "react";
import "./NavBar.css";
import logo from "../../assets/crypto-logo.svg";
import icon from "../../assets/arrow.svg";
import { CoinContext } from "../../context/CoinContext";
import { RowContext } from "../../context/RowContext";  // Import the context
import { Link } from "react-router-dom";

const NavBar = () => {
  const { setCurrency } = useContext(CoinContext);
  const { selectedRows, setSelectedRows } = useContext(RowContext);  // Use the context

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "USD":
        setCurrency({ name: "USD", symbol: "$" });
        break;
      case "CAD":
        setCurrency({ name: "CAD", symbol: "$" });
        break;
      case "EUR":
        setCurrency({ name: "EUR", symbol: "€" });
        break;
      default:
        setCurrency({ name: "USD", symbol: "$" });
    }
  };

  const handleRowsChange = (event) => {
    setSelectedRows(Number(event.target.value));
  };

  return (
    <div className="NavBar">
      <Link to={"/"}>
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <ul>
        <Link to={"/"}><li>Home</li></Link>
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
          Sign Up <img src={icon} alt="sign up"></img>
        </button>
        <select value={selectedRows} onChange={handleRowsChange}>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="80">80</option>
        </select>
        <span>Rows</span>
      </div>
    </div>
  );
};

export default NavBar;
import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>Welcome to the largest Crypto MarketPlace</p>
        <form>
          <input type="text" placeholder="Search Crypto.." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 30).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank || "N/A"}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol || "N/A"}</p>
            </div>
            <p>
              {currency.symbol + item.current_price.toLocaleString() || "N/A"}
            </p>
            <p
              className={item.price_change_24h.toFixed(2) > 0 ? "green" : "red"}
              style={{ textAlign: "center" }}
            >
              {item.price_change_24h.toFixed(2) || "N/A"}
            </p>
            <p className="market-cap">
              {currency.symbol + item.market_cap.toLocaleString() || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

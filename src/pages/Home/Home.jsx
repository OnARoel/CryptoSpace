import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState(allCoin); // Initialize with all coins
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    const query = e.target.value;
    setInput(query);

    if (query === "") {
      setDisplayCoin(allCoin); // If input is empty, reset to all coins
    } else {
      const filteredCoins = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayCoin(filteredCoins);
    }
  };

  useEffect(() => {
    setDisplayCoin(allCoin); // Reset to all coins whenever allCoin changes
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>Welcome to the largest Crypto MarketPlace</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={inputHandler}
            // list="crypto"
            value={input}
            required
            type="text"
            placeholder="Search Crypto.."
          />
          {/* <datalist id="crypto">
            {allCoin.map((item, index) => {
              return <option key={index} value={item.name} />;
            })}
          </datalist> */}
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={displayCoin.length > 0 ? "crypto-table" : "hidden"}>
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 30).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

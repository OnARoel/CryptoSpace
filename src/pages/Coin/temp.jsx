import React, { useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { useContext } from "react";
import DataChart from "../../components/Chart/DataChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  // CORS Anywhere proxy URL
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-bNTT9ZyTB7yiFxQwzC1yVQdU", // You can remove this if not needed
      },
    };

    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval-daily`;

    fetch(proxyUrl + apiUrl, options)
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error("Error fetching historical data:", err));
  };

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-bNTT9ZyTB7yiFxQwzC1yVQdU", // You can remove this if not needed
      },
    };

    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;

    fetch(proxyUrl + apiUrl, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error("Error fetching coin data:", err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <>
        <div className="coin">
          <div className="coin-name">
            <h1>{coinData?.name}</h1>
            <img src={coinData?.image?.large} alt={coinData?.name} />
          </div>
        </div>
        <div className="coin-chart">
          <DataChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>

          <ul>
            <li>Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price?.[currency.name.toLowerCase()]}</li>
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="spinner">
          <div className="spin"></div>
        </div>
      </>
    );
  }
};

export default Coin;

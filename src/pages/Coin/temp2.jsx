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

  const fetchHistoricalData = async () => {
    fetch(
      `http://localhost:5000/api/${coinId}?currency=${currency.name}&days=10`
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res.historicalData))
      .catch((err) => console.error(err));
  };

  const fetchCoinData = async () => {
    fetch(`http://localhost:5000/api/${coinId}?currency=${currency.name}`)
      .then((res) => res.json())
      .then((res) => setCoinData(res.coinData))
      .catch((err) => console.error(err));
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
            <li>
              {currency.symbol}
              {
                coinData.market_data.current_price?.[
                  currency.name.toLowerCase()
                ]
              }
            </li>
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
        ;
      </>
    );
  }
};

export default Coin;

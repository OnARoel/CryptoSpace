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
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-bNTT9ZyTB7yiFxQwzC1yVQdU",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-bNTT9ZyTB7yiFxQwzC1yVQdU",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData) {
    return (
      <>
        <div className="coin">
          <div className="coin-name">
            <h1>{coinData?.name}</h1>
            <img src={coinData?.image?.large} alt={coinData?.name} />
          </div>
        </div>
        <div className="coin-chart">
          <DataChart historicalData={historicalData}/>
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

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

  // Helper function for API calls
  const fetchFromApi = async (endpoint, params) => {
    try {
      const response = await fetch('/.netlify/functions/coinapi', {
        method: 'POST',
        body: JSON.stringify({ endpoint, params }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const data = await fetchFromApi(
        `/coins/${coinId}/market_chart`,
        `vs_currency=${currency.name}&days=10&interval=daily`
      );
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCoinData = async () => {
    try {
      const data = await fetchFromApi(`/coins/${coinId}`);
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]); // Added coinId to dependency array

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
            {/* <li>
              {currency.symbol}
              {coinData.market_data.current_price?.[currency.name.toLowerCase()]}
            </li> */}
          </ul>
        </div>
      </>
    );
  }

  return (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  );
};

export default Coin;
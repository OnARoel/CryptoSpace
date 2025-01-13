import React, { useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { useContext } from "react";

const Coin = () => {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState();
  const {currency } = useContext(CoinContext);

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
  }, []);

  return (
    <>
      <div className="coin">
        <div className="coin-name">
          <h1>{coinData?.name}</h1>
          <img src={coinData?.image?.large} alt={coinData?.name} />
        </div>
      </div>
    </>
  );
};

export default Coin;

import Chart from "react-google-charts";
import React, { useState, useEffect } from "react";

const DataChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    let dataTemp = [["Date", "Price"]];
    if (historicalData.prices) {
      historicalData.prices.map((price) => {
        dataTemp.push([new Date(price[0]).toLocaleDateString().slice(0, -5), price[1]]);
      });
    }
    setData(dataTemp); 
  }, [historicalData]);

  return (
    <>
      <div>
        <Chart
          chartType="LineChart"
          data={data}
          options={{ title: "Coin Prices Over Time" }}
        />
      </div>
    </>
  );
};

export default DataChart;

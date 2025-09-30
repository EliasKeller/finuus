"use client";

import { get } from "http";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHistoricalStockDataByIsbn } from "../../../../api/services/stocks";
import { LineChartComponent } from "../../components/lineChat";

export default function Page() {
  const params = useParams();
  const [historicalData, setHistoricalData] = useState([]);

  const loadHistoricalData = () => {
    return Promise.all([]).then(() => {
      getHistoricalStockDataByIsbn(params.isin)
      .then(data => setHistoricalData(data))
      .catch(err => console.error("Error fetching historical stock data:", err)); 
    });
  }

  useEffect(() => {
    loadHistoricalData();
  }, []);

  return (
    <div>
      <h1>Stock {params.isin}</h1>
      <LineChartComponent data={historicalData} />
    </div>
  );
}
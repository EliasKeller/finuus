"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHistoricalStockDataByIsbn, getOrdersByIsin } from "../../../../api/services/stocks";
import { LineChartComponent } from "../../components/lineChat";
import { mapOrdersToGraphMarkers } from "../../../../utils/utils";

export default function Page() {
  const params = useParams();
  const [historicalData, setHistoricalData] = useState([]);
  const [graphMarkers, setGraphMarkers] = useState([]);
  const loadHistoricalData = () => {
    return Promise.all([ 
      getHistoricalStockDataByIsbn(params.isin).then(data => setHistoricalData(data)),
      getOrdersByIsin(params.isin).then(orders => setGraphMarkers(mapOrdersToGraphMarkers(orders)))
    ]).catch(err => console.error("Error fetching historical data:", err));
  }

  useEffect(() => {
    loadHistoricalData();
  }, []);

  return (
    <div>
      <h1>Stock {params.isin}</h1>
      <LineChartComponent data={historicalData} graphMarkers={graphMarkers} />
    </div>
  );
}
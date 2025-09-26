
"use client"
import { useEffect, useState } from "react";
import { getAllProducts, getHistoricalStockDataByIsbn } from "../../api/services/stocks";
import { ChartComponent } from "./components/chart";
import { Card } from "./components/card";
import { Icon } from "@iconify/react";
export default function Home() {
  const [stocks, setStocks] = useState([]);

  const loadAllProducts = () => {
    return Promise.all([]).then(() => {
        getAllProducts()
        .then(data => {
          console.log(data);
        })
        .then(() => getHistoricalStockDataByIsbn("AAPL", "1day"))
        .then(data => {
            setStocks(data);
          })
          .catch(err => console.error("Error fetching historical stock data:", err));
      });
  }

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1>Hi there! This is the FinusasdASDuasdfasdfs!</h1>
      <Icon icon="fluent:home-24-regular" width="24" height="24" />
      <Card
        title="Apple Inc."
        isin="US0378331005"
        provitInPercent={5.2}
        currentPrice={150.25}
        currency="USD"
      />
      <ChartComponent data={stocks} />
    </div>
  );
}

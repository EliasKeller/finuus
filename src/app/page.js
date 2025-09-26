
"use client"
import { useEffect, useState } from "react";
import { getAllProducts, getHistoricalStockDataByIsbn } from "../../api/services/stocks";
import { ChartComponent } from "./components/chart";
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
      <ChartComponent data={stocks} />
    </div>
  );
}

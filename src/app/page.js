
"use client"
import { useEffect, useState } from "react";
import { getAllProducts, getHistoricalStockDataByIsbn } from "../../api/services/stocks";
import { ChartComponent } from "./components/chart";
import { PieChart } from "./components/pieChart";
import { Card } from "./components/card";
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

  const labels = ["AAPL", "MSFT", "NVDA", "Cash"];
  const values = [45, 25, 20, 10];

  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <Card
        title="Apple Inc."
        isin="US0378331005"
        provitInPercent={5.2}
        currentPrice={150.25}
        currency="USD"
        onClick={() => alert('Card clicked!')}
      />
      <ChartComponent data={stocks} />
       <PieChart labels={labels} values={values} title="Portfolio" />
    </div>
  );
}

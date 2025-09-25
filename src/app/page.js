
"use client"
import { useEffect } from "react";
import { getAllProducts, getHistoricalStockDataByIsbn } from "../../api/services/stocks";
import { ChartComponent } from "./components/chart";
export default function Home() {


const loadAllProducts = () => {
  return Promise.all([]).then(() => {
    getAllProducts()
    .then(data => {
      console.log(data);
    })
    .then(getHistoricalStockDataByIsbn("AAPL", "1day"))
    .then(data => {
        console.log("Historical stock data:", data);
      })
      .catch(err => console.error("Error fetching historical stock data:", err));
  });
}



useEffect(() => {
  loadAllProducts();
}, []);

const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];


  console.log("Rendering Home");

  return (
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <h1>Hi there! This is the FinusasdASDuasdfasdfs!</h1>
      <ChartComponent data={initialData} />
    </div>
  );
}

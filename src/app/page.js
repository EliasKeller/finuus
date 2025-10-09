
"use client"
import { useEffect, useState } from "react";
import { getAllProducts, getMetadataOfProducts } from "../../api/services/stocks";
import { PieChartComponent } from "./components/pieChart";
import { Card } from "./components/card";
import { CardSkeleton } from "./components/cardSkeleton";
export default function Home() {
  const [products, setProducts] = useState([]);

  const loadAllProducts = () => {
    return Promise.all([]).then(() => {
        getAllProducts()
        .then(products => getMetadataOfProducts(Object.keys(products)))
        .then(productsWithMetadata => setProducts(productsWithMetadata))
        .catch(err => console.error("Error fetching historical stock data:", err));
      });
  }

  useEffect(() => {
    loadAllProducts();
  }, []);

  const labels = ["AAPL", "MSFT", "NVDA", "Cash"];
  const values = [45, 25, 20, 10];

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 place-items-center w-full">
      {products.length === 0 && (
        <>
          <CardSkeleton className="w-full max-w-sm" />
          <CardSkeleton className="w-full max-w-sm" />
          <CardSkeleton className="w-full max-w-sm" />
          <CardSkeleton className="w-full max-w-sm" />
        </>
      )}
      {products.map(element => (
        <Card
          className="w-full max-w-sm"
          key={element.isin}
          title={element.name}
          isin={element.isin}
          provitInPercent={5.2}
          currentPrice={element.close}
          currency={element.currency}
          href={`/stocks/${element.isin}`}
        />
      ))}
      </div>
    </div>
  );
}

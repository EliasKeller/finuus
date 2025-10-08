"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHistoricalStockDataByIsbn, getOrdersByIsin } from "../../../../api/services/stocks";
import { LineChartComponent } from "../../components/lineChat";
import { Table } from "../../components/table";

export default function ProductDetailPage() {
  const params = useParams();
  const [historicalData, setHistoricalData] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadHistoricalData = () => {
    return Promise.all(
      [
        getHistoricalStockDataByIsbn(params.isin).then(data => setHistoricalData(data)),
        getOrdersByIsin(params.isin).then(data => setOrders(data))
      ]
    ).catch(err => console.error("Error fetching historical stock data:", err)); 
  }

  useEffect(() => {
    loadHistoricalData();
  }, []);

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (value, row) => (
        <div>
          <div className="font-semibold text-white">{value}</div>
          <div className="text-xs text-gray-500">{row.time}</div>
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      render: (value, row) => (
        <div>
          <div className="font-semibold text-white">{value}</div>
          <div className="text-xs text-gray-500">{row.isin}</div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            value === "BUY" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (value) => <span className="font-mono text-white">{value}</span>,
    },
    {
      key: "course",
      label: "Price",
      render: (value) => <span className="font-mono text-white">€{value.toFixed(2)}</span>,
    },
    {
      key: "totalValue",
      label: "Total Value",
      render: (value) => (
        <span className={`font-mono font-semibold ${value >= 0 ? "text-green-500" : "text-red-500"}`}>
          €{value.toFixed(2)}
        </span>
      ),
    },
    {
      key: "placeOfExecution",
      label: "Exchange",
    },
  ]

  return (
    <div>
      <h1>Stock {params.isin}</h1>
      <LineChartComponent data={historicalData} orders={orders} />
      <Table columns={columns} data={orders} className="mt-4" />
    </div>
  );
}
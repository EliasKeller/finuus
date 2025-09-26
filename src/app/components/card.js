"use client";

import { useRef } from "react";

export function Card({ title, isin, provitInPercent, currentPrice, currency }) {
  const containerRef = useRef(null);

  return (
    <div className="w-full p-4 m-4 border rounded-lg shadow-lg bg-black border-white">
        <div className="mb-2">
            <h2 className="text-xl font-bold">{title} ({isin})</h2>
            <p className="text-sm text-gray-400">Current Price: {currentPrice} {currency}</p>
            <p className={`text-sm ${provitInPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Profit: {provitInPercent}%
            </p>
        </div>
    </div>
  );
}

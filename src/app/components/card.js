"use client";

import { useRef } from "react";
import { Button } from "./button";

export function Card({ className = "", title, isin, provitInPercent, currentPrice, currency, onClick }) {

  return (
    <div className={`flex justify-between w-96 p-4 m-4 border rounded-lg shadow-lg bg-black border-white ${className}`}>
        <div>
            <h2 className="text-xl font-bold">{title} ({isin})</h2>
            <p className="text-sm text-gray-400">Current Price: {currentPrice} {currency}</p>
            <p className={`text-sm ${provitInPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                Profit: {provitInPercent}%
            </p>
            </div>
            <div className="flex items-end mt-2">
              <Button onClick={onClick}  icon="iconoir:fast-arrow-right" gradientBackground={true}>
              </Button>
            </div>
    </div>
  );
}

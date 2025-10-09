"use client"

import { Button } from "./button"

export function Card({className = "", title, isin, provitInPercent, currentPrice, currency, href}) {

  return (
    <div
      className={`group relative flex flex-col justify-between w-full max-w-md p-6 border-white/10 rounded-lg bg-neutral-900 transition-colors ${className}`}
    >
      <div className="space-y-4">
        {/* Header section */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
          <p className="text-sm text-gray-500 font-mono tracking-wider">{isin}</p>
        </div>

        {/* Price and profit section */}
        <div className="flex items-end justify-between pt-2 border-t border-t border-white/20">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Current Price</p>
            <p className="text-xl font-bold text-white">
              {Number(currentPrice).toFixed(2)} {currency}
            </p>
          </div>

          <div className="text-right space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Profit</p>
            <p className={`text-xl font-bold ${provitInPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
              {provitInPercent >= 0 ? "+" : ""}
              {provitInPercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Button section */}
      <div className="flex justify-end mt-6 pt-4 border-t border-white/20">
        <Button href={href} icon="iconoir:fast-arrow-right" gradientBackground={false} />
      </div>
    </div>
  )
}

"use client"

import { Icon } from "@iconify/react"



export function ProductDetailCard({ orders = [], currency = "EUR", className = ""}) {
  const totalAmount = 23
  const totalInvested = 70568.23
  const totalFees = 12.34
  const currentPrice = 99.25
  const currentValue = 12.25
  const totalWin = 50.36
  const totalWinPercent = 5.36
  const productName = "ISHARES EMIMD UCITS ETF USD (Acc)"
  const isin = "IE00BKM4GZ66"

  return (
    <div className={`relative overflow-hidden rounded-lg p-6 bg-neutral-900 ${className}`}>


      {/* Product Header */}
      <div className="mb-6 flex items-center gap-4 border-b border-white/20 pb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black">
          <Icon icon="iconoir:graph-up" className="text-3xl" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{productName}</h2>
          <p className="text-sm text-gray-400">{isin}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Current Price</p>
          <p className="text-xl font-bold text-white">
            {currentPrice.toFixed(2)} {currency}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {/* Total Amount */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon icon="iconoir:box" className="text-xl text-cyan-400" />
            <p className="text-sm text-gray-400">Amount</p>
          </div>
          <p className="text-xl font-bold text-white">{totalAmount}</p>
          <p className="text-xs text-gray-500">Shares</p>
        </div>

        {/* Total Invested */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon icon="iconoir:wallet" className="text-xl text-blue-400" />
            <p className="text-sm text-gray-400">Invested</p>
          </div>
          <p className="text-xl font-bold text-white">{totalInvested.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{currency}</p>
        </div>

        {/* Current Value */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon icon="iconoir:stats-up-square" className="text-xl text-purple-400" />
            <p className="text-sm text-gray-400">Current Value</p>
          </div>
          <p className="text-xl font-bold text-white">{currentValue.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{currency}</p>
        </div>

        {/* Total Fees */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon icon="iconoir:percentage-square" className="text-xl text-orange-400" />
            <p className="text-sm text-gray-400">Fees Paid</p>
          </div>
          <p className="text-xl font-bold text-white">{totalFees.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{currency}</p>
        </div>

        {/* Profit/Loss - Spans 2 columns */}
        <div className="col-span-2 rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
          <div className="flex items-end gap-3">
            <Icon
              icon={totalWin >= 0 ? "iconoir:arrow-up-circle" : "iconoir:arrow-down-circle"}
              className={`text-4xl ${totalWin >= 0 ? "text-green-500" : "text-red-500"}`}
            />
            <div className="flex-1">
              <p className="text-sm text-gray-400">{totalWin >= 0 ? "Total Profit" : "Total Loss"}</p>
              <div className="flex items-baseline gap-3">
                <p className={`text-xl font-bold ${totalWin >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {totalWin >= 0 ? "+" : ""}
                  {totalWin.toFixed(2)} {currency}
                </p>
                <p className={`text-xl font-semibold ${totalWin >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ({totalWin >= 0 ? "+" : ""}
                  {totalWinPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
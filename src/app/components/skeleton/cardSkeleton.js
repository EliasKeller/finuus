"use client";

import React from "react";

export function CardSkeleton({ className = "" }) {
  return (
    <div
      className={`group relative flex flex-col justify-between w-full max-w-md p-6 border border-white/10 rounded-lg bg-neutral-900 ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-4">
        {/* Header section */}
        <div className="space-y-1 animate-pulse">
          {/* Title */}
          <div className="h-6 w-2/3 rounded bg-white/10" />
          {/* ISIN */}
          <div className="h-4 w-40 rounded bg-white/10" />
        </div>

        {/* Price and profit section */}
        <div className="pt-2 border-t border-white/20">
          <div className="flex items-end justify-between animate-pulse">
            {/* Current Price */}
            <div className="space-y-1">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-6 w-28 rounded bg-white/10" />
            </div>

            {/* Profit */}
            <div className="text-right space-y-1">
              <div className="h-3 w-14 ml-auto rounded bg-white/10" />
              <div className="h-6 w-20 ml-auto rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Button section */}
      <div className="flex justify-end mt-6 pt-4 border-t border-white/20">
        {/* runder Icon-Button als Placeholder */}
        <div className="h-9 w-9 rounded-lg bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}

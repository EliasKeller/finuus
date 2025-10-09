// app/components/ChartSkeleton.tsx
"use client";
import React from "react";
import { ButtonSkeleton } from "./buttonSkeleton";

export function LineChartSkeleton({height = 384, className = ""}) {
  return (
    <div
      className={`w-full p-4 rounded-lg shadow-lg bg-neutral-900 ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex justify-end gap-2 mb-2">
        <ButtonSkeleton />
        <ButtonSkeleton />
        <ButtonSkeleton />
        <ButtonSkeleton />
        <ButtonSkeleton />
      </div>

      <div
        className="relative w-full rounded overflow-hidden"
        style={{ height }}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 75%, transparent 75%, transparent)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/10 to-transparent" />

        <div className="absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-white/10 to-transparent" />

        <div className="absolute inset-4">
          <div className="h-full w-full rounded bg-white/5" />
        </div>

        <div className="absolute top-0 bottom-0 w-[2px] left-1/2 bg-white/10" />
      </div>
    </div>
  );
}

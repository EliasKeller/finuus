// app/components/ChartSkeleton.tsx
"use client";
import React from "react";

export function LineChartSkeleton({height = 384, className = ""}) {
  return (
    <div
      className={`w-full p-4 border rounded-lg shadow-lg border-white ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Top-Controls (Buttons) */}
      <div className="flex justify-end gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-12 rounded-lg bg-white/10 animate-pulse" />
        ))}
      </div>

      {/* Delta-Info Platzhalter (schmal, damit nix springt wenn sichtbar) */}
      <div className="h-6 w-[420px] max-w-full rounded bg-white/5 mb-2" />

      {/* Chart-Fläche */}
      <div
        className="relative w-full rounded overflow-hidden"
        style={{ height }}
      >
        {/* Hintergrundfläche (subtiles Muster) */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 75%, transparent 75%, transparent)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* linke Y-Achsenleiste */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white/10 to-transparent" />

        {/* untere X-Achsenleiste */}
        <div className="absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-white/10 to-transparent" />

        {/* „Kurven“-Balken andeuten */}
        <div className="absolute inset-4">
          <div className="h-full w-full rounded bg-white/5" />
        </div>

        {/* Tooltip-Spalte Placeholder */}
        <div className="absolute top-0 bottom-0 w-[2px] left-1/2 bg-white/10" />
      </div>
    </div>
  );
}

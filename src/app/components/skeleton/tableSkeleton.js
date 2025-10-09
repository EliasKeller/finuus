// app/components/TableSkeleton.tsx
"use client";

import React from "react";

export function TableSkeleton({columns, rowCount = 6, className = ""}) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg shadow-lg bg-neutral-900 ${className}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <table className="w-full text-left">
        <thead className="border-b border-white/20">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-sm font-semibold text-white"
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  <span className="text-xs text-gray-400 opacity-30 select-none">↕</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="animate-pulse">
          {Array.from({ length: rowCount }).map((_, r) => (
            <tr key={r}
              className="border-b border-white/10">
              {columns.map((col, c) => (
                <td
                  key={`${r}-${col.key}`}
                  className="px-4 py-3 text-sm text-gray-300"
                >
                  <div
                    className="h-4 rounded bg-white/10"
                    style={{width: c === 0 ? "60%": c === columns.length - 1 ? "40%": `${40 + ((r + c) % 4) * 12}%`}}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";

export function Table({ data, columns, className = "" }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);


/* *************************
          USEMEMO
  ************************* */
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection){
      return data;
    } 

    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      let comparison = 0;
      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);


/* *************************
          HELPERS
  ************************* */
  const handleSort = (columnKey) => {
    if (sortKey === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(columnKey);
      setSortDirection("asc");
    }
  };

  return (
    <div className={`w-full overflow-x-auto border rounded-lg shadow-lg bg-black border-white ${className}`}>
      <table className="w-full text-left">
        <thead className="border-b border-white/20">
          <tr>
            {columns.map((column) => {
              const isSortable = column.sortable !== false;
              const isActiveSortColumn = sortKey === column.key;

              return (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-sm font-semibold text-white ${isSortable ? "cursor-pointer select-none hover:bg-white/5 transition-colors" : ""}`}
                  onClick={() => isSortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {isSortable && (
                      <span className="text-s">
                        {isActiveSortColumn ? (
                          sortDirection === "asc" ? ("↑") : ("↓")
                        ) : (
                          <span className="opacity-60">↕</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData && sortedData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              {columns.map((column) => (
                <td key={`${row.id || rowIndex}-${column.key}`} className="px-4 py-3 text-sm text-gray-300">
                  {typeof column.render === "function" ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
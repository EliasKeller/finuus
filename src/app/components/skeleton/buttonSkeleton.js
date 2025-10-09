// app/components/ChartSkeleton.tsx
"use client";
import React from "react";

export function ButtonSkeleton({ className = ""}) {
  return (
    <div className={` h-9 w-12 rounded-lg bg-white/10 animate-pulse ${className}`} />
  );
}

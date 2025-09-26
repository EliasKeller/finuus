// src/app/components/Chart.jsx
"use client";

import { version } from "lightweight-charts"; console.log(version());

import { useEffect, useRef } from "react";
import { createChart, AreaSeries, ColorType } from "lightweight-charts";

export function ChartComponent({ data }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const chartContainerElement = containerRef.current;
    if (!chartContainerElement) return;

    const chart = createChart(chartContainerElement, {
      width: chartContainerElement.clientWidth || 600,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: "black" },
        textColor: "white",
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "rgba(41,98,255,0.40)",
      bottomColor: "rgba(41,98,255,0.05)",
    });

    const ds = [...(data ?? [])]
      .map(d => ({ time: d.time, value: Number(d.value) }))
      .filter(d => d.time && Number.isFinite(d.value))
      .sort((a, b) => new Date(a.time) - new Date(b.time));

    series.setData(ds);

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(([entry]) => {
      chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
    });
    resizeObserver.observe(chartContainerElement);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  // WICHTIG: sichtbare Breite/Höhe
  return <div ref={containerRef} style={{ width: "100%", height: 300 }} />;
}

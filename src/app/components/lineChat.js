"use client";
import { useEffect, useRef } from "react";
import { createChart, AreaSeries, ColorType } from "lightweight-charts";

export function LineChartComponent({ data }) {
  const containerRef = useRef(null);

  const sortData = (data) => {
    return [...(data ?? [])]
      .map(d => ({ time: d.time, value: Number(d.value) }))
      .filter(d => d.time && Number.isFinite(d.value))
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  };


  useEffect(() => {
    const chartContainerElement = containerRef.current;
    if (!chartContainerElement) {
      return;
    }

    const chart = createChart(chartContainerElement, {
      width: chartContainerElement.clientWidth || 600,
      height: 300,
      layout: {
        background: { type: ColorType.VerticalGradient, color: "black" },
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

    const sortedData = sortData(data);
    series.setData(sortedData);

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

  return (
    <div className="w-full p-4 m-4 border rounded-lg shadow-lg bg-black border-white">
      <div ref={containerRef} style={{ width: "100%", height: 300 }} />
    </div>
  );
}

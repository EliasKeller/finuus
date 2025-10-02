"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, AreaSeries, ColorType } from "lightweight-charts";
import { Button } from "./button";

export function LineChartComponent({ data }) {
  const chartRef = useRef(null);
  const chartInstance= useRef(null);
  const [chartData, setChartData] = useState([]);

  const sortData = (data) => {
    return [...(data ?? [])]
      .map(d => ({ time: d.time, value: Number(d.value) }))
      .filter(d => d.time && Number.isFinite(d.value))
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  };


  useEffect(() => {
    const chartContainerElement = chartRef.current;
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
    setChartData(sortedData);

    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(([entry]) => {
      chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
    });
    resizeObserver.observe(chartContainerElement);

    chartInstance.current = chart;
    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);


  /* *************************
            HELPERS
  ************************* */
const minusDaysIso = (isoYYYYMMDD, days) => {
  const date = new Date(isoYYYYMMDD + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

const setRangeByDays = (days) => {
  const chart = chartInstance.current;
  if (!chart || chartData.length === 0) return;

  const last = chartData.at(-1).time;
  const from = minusDaysIso(last, days);
  chart.timeScale().setVisibleRange({ from, to: last });
};

const fitContent = () => {
  const chart = chartInstance.current;
  if (!chart) return;
  chart.timeScale().fitContent();
};

  return (
    <div className="flex justify-center w-full p-4">
      <div className="flex flex-col justify-center w-full lg:w-5/6 p-4 border rounded-lg shadow-lg border-white">
        <div className="flex justify-end gap-2 mb-2">
              <Button onClick={() => setRangeByDays(1)} text="1D" gradientBackground={true} />
              <Button onClick={() => setRangeByDays(7)} text="1W" gradientBackground={true} />
              <Button onClick={() => setRangeByDays(30)} text="1M" gradientBackground={true} />
              <Button onClick={() => setRangeByDays(365)} text="1Y" gradientBackground={true} />
              <Button onClick={() => fitContent()} text="All" gradientBackground={true} />
        </div>
        <div ref={chartRef} style={{ width: "100%", height: 300 }} />
      </div>
    </div>
  );
}

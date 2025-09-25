"use client";
import { useEffect, useRef } from "react";

export const ChartComponent = ({ data }) => {
  const ref = useRef(null);

  useEffect(() => {
    let chart, series;
    (async () => {
      const mod = await import("lightweight-charts"); // named export
      console.log("LWC exports:", Object.keys(mod));   // Debug: sollte u.a. createChart zeigen
      const { createChart } = mod;

      const el = ref.current;
      chart = createChart(el, { width: 600, height: 300 });

      // Wenn addAreaSeries fehlt, fallback auf Line (Debug-Log hilft)
      if (typeof chart.addAreaSeries === "function") {
        series = chart.addAreaSeries();
      } else if (typeof chart.addLineSeries === "function") {
        console.warn("addAreaSeries fehlt → fallback Line");
        series = chart.addLineSeries({ lineWidth: 2 });
      } else {
        console.error("Weder addAreaSeries noch addLineSeries vorhanden!", chart);
        return;
      }

      // Daten (time: 'YYYY-MM-DD', value: number)
      
      const ds = [...data].sort((a, b) => new Date(a.time) - new Date(b.time));
      series.setData(ds);
    })();
    return () => chart?.remove();
  }, [data]);

  // feste Größe → garantiert >0px Breite
  return <div ref={ref} style={{ width: 640, height: 320 }} />;
}

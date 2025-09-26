"use client";


import { AreaSeries, createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = ({ data }) => {
  const ref = useRef(null);

  const colors = {
    background: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
  };

  const chartContainerRef = useRef();

      useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: colors.background },
                    textColor: colors.textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            if (typeof chart.addAreaSeries === "function") {
            } else if (typeof chart.addLineSeries === "function") {
              console.warn("addAreaSeries fehlt → fallback Line");
            } else {
              console.error("Weder addAreaSeries noch addLineSeries vorhanden!", chart);
              return;
      }

            const newSeries = chart.addSeries(AreaSeries, { lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor });
            const ds = [...data].sort((a, b) => new Date(a.time) - new Date(b.time));
            newSeries.setData(ds);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, colors.background, colors.lineColor, colors.textColor, colors.areaTopColor, colors.areaBottomColor]
    );

  /*useEffect(() => {
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
  }, [data]);*/

  // feste Größe → garantiert >0px Breite
  return (
    <>
      {/* <div ref={ref} style={{ width: 640, height: 320 }} /> */}
      <div ref={chartContainerRef} />
    </>
  );
}

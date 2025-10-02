"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, AreaSeries, ColorType } from "lightweight-charts";
import { Button } from "./button";

export function LineChartComponent({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const anchorRef = useRef(null);
  const toolTipWidth = 96;
  const toolTip = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [deltaInfo, setDeltaInfo] = useState(null); 

/* *************************
          CONST
  ************************* */
  const getChartOptions = (chartContainerElement) => {
    return {
      width: chartContainerElement.clientWidth,
      height: chartContainerElement.clientHeight,
      layout: {
        background: { type: ColorType.VerticalGradient, color: "black" },
        textColor: "white",
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
      },
      rightPriceScale: {
          visible: false,
      },
      timeScale: {
          borderVisible: false,
      },
      crosshair: {
          horzLine: {
              visible: false,
              labelVisible: false,
          },
          vertLine: {
              visible: true,
              style: 0,
              width: 2,
              color: 'rgba(0, 255, 76, 0.1)',
              labelVisible: false,
          },
      },
      grid: {
          vertLines: {
              visible: false,
          },
          horzLines: {
              visible: false,
          },
      },
    };
  };

  const seriesOptions = {
    lineColor: "#2962FF",
    topColor: "rgba(41,98,255,0.40)",
    bottomColor: "rgba(41,98,255,0.05)",
  };

  const seriesPriceScaleOptions = {
    scaleMargins: {
        top: 0.25, 
        bottom: 0.1,
    },
  };

  const sortData = (data) => {
    return [...(data ?? [])]
      .map(d => ({ time: d.time, value: Number(d.value) }))
      .filter(d => d.time && Number.isFinite(d.value))
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  };

/* *************************
          USEFFECT
  ************************* */
  useEffect(() => {
    const chartContainerElement = chartRef.current;
    if (!chartContainerElement) {
      return;
    }

    const chart = createChart(chartContainerElement, getChartOptions(chartContainerElement));

    const series = chart.addSeries(AreaSeries, seriesOptions);

    const sortedData = sortData(data);
    series.priceScale().applyOptions(seriesPriceScaleOptions);
    series.setData(sortedData);
    setChartData(sortedData);

    chart.timeScale().fitContent();

    chart.subscribeClick(onGraphClick);
    chart.subscribeCrosshairMove(onGraphHover);

    const resizeObserver = new ResizeObserver(([entry]) => {
      chart.applyOptions({ width: Math.floor(entry.contentRect.width) });
    });
    resizeObserver.observe(chartContainerElement);

    chartInstance.current = chart;
    seriesRef.current = series;
    return () => {
      resizeObserver.disconnect();
      chart.unsubscribeClick(onGraphClick);
      chart.unsubscribeCrosshairMove(onGraphHover);
      chart.remove();
    };
  }, [data]);


/* *************************
          EVENTS
  ************************* */
const onGraphClick = (clickEvent) => {
      const serieData = clickEvent?.seriesData?.get(seriesRef.current);
      const value = serieData?.value;
      const time = clickEvent?.time;

      if (value == null || time == null) {
        return;
      }

      if (!anchorRef.current) {
        anchorRef.current = { time, value };
        setDeltaInfo(null);
        return;
      }

      // zweiter Klick -> Differenzen berechnen
      const from = anchorRef.current;
      const abs = value - from.value;
      const pct = (abs / from.value) * 100;
      setDeltaInfo({
        abs,
        pct,
        fromVal: from.value,
        toVal: value,
        fromTime: from.time,
        toTime: time,
      });

      // zurücksetzen (nächste Messung wieder 2 Klicks)
      anchorRef.current = null;
};

const onGraphHover = (hoverEvent) => {
  console.log("hoverEvent", hoverEvent);
};

/*

// Create and style the tooltip html element

// update tooltip
chart.subscribeCrosshairMove(param => {
    if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
    ) {
        toolTip.style.display = 'none';
    } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTip.style.display = 'block';
        const data = param.seriesData.get(series);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `<div style="color: ${'rgba( 239, 83, 80, 1)'}">⬤ ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
            ${Math.round(100 * price) / 100}
            </div><div style="color: ${'black'}">
            ${dateStr}
            </div>`;

        let left = param.point.x; // relative to timeScale
        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale('left').width();
        const halfTooltipWidth = toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
        left = Math.max(left, priceScaleWidth);

        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
    }
});*/

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
              <Button onClick={fitContent} text="All" gradientBackground={true} />
        </div>

        {/* Δ-Info Anzeige */}
          {deltaInfo && (
            <div className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white border border-white/20">
              Δ {deltaInfo.abs.toFixed(2)} ({deltaInfo.pct.toFixed(2)}%) ·
              &nbsp;{deltaInfo.fromTime} → {deltaInfo.toTime}
              &nbsp;| {deltaInfo.fromVal.toFixed(2)} → {deltaInfo.toVal.toFixed(2)}
            </div>
          )}

        <div ref={chartRef} className="w-full h-96">
          <div ref={toolTip} style={{ display: 'none', borderColor: `rgba(239, 83, 80, 1)`, background: `rgba(255, 255, 255, 0.25)`, width: `${toolTipWidth}px`, height: '300px', position: 'absolute', padding: '8px', boxSizing: 'border-box', fontSize: '12px', textAlign: 'left', zIndex: 1000, top: '12px', left: '12px', pointerEvents: 'none', borderRadius: '4px 4px 0px 0px', borderBottom: 'none', boxShadow: '0 2px 5px 0 rgba(117, 134, 150, 0.45)', fontFamily: '-apple-system, BlinkMacSystemFont, \'Trebuchet MS\', Roboto, Ubuntu, sans-serif', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
          </div>
        </div>
      </div>  
    </div>
  );
}

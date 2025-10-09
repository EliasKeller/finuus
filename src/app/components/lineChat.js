"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, createSeriesMarkers, AreaSeries, ColorType } from "lightweight-charts";
import { Button } from "./button";
import { ORDER_TYPE } from "../../../utils/const";

export function LineChartComponent({ data, orders=[] }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const seriesRef = useRef(null);
  const anchorRef = useRef(null);
  const toolTipWidth = 96;
  const toolTip = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [deltaInfo, setDeltaInfo] = useState(null); 
  const [hoverPrice, setHoverPrice] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [activeGraphRange, setActiveGraphRange] = useState(null);
  const suppressNextRangeChangeRef = useRef(false);

/* *************************
          CONST
  ************************* */
  const getChartOptions = (chartContainerElement) => {
    return {
      width: chartContainerElement.clientWidth,
      height: chartContainerElement.clientHeight,
      layout: {
        background: { color: '#171717' },
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

    
    if (data.length > 0) {
      // TODO: to refactor as soon as data contains all market data
      const markers = orders.map(order => {
      return         {
              time: ((d) => ({year: d.getFullYear(), month: d.getMonth()+1, day: d.getDate()}))(new Date(data[Math.floor(Math.random()*data.length)].time)),
              position: order.type == ORDER_TYPE.BUY ? 'aboveBar': 'belowBar',
              color: order.type == ORDER_TYPE.BUY ? '#00c951' : '#e12a36',
              shape: order.type == ORDER_TYPE.BUY ? 'arrowDown': 'arrowUp',
              text: order.type,
          }
      });
      createSeriesMarkers(series, markers);
    }

    chart.timeScale().fitContent();

	  chart.timeScale().subscribeVisibleTimeRangeChange(onTimeRangeChange);
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
  }, [data, orders]);


/* *************************
          EVENTS
  ************************* */
 const onTimeRangeChange = (newVisibleTimeRange) => {
  if (suppressNextRangeChangeRef.current) {
    suppressNextRangeChangeRef.current = false;
    return;
  }

  setActiveGraphRange(null);
};

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
  if (
        hoverEvent.point === undefined ||
        !hoverEvent.time ||
        hoverEvent.point.x < 0 ||
        hoverEvent.point.x > chartRef.current.clientWidth ||
        hoverEvent.point.y < 0 ||
        hoverEvent.point.y > chartRef.current.clientHeight
    ) {
      toolTip.current.style.display = 'none';
    } else {
      const data = hoverEvent.seriesData.get(seriesRef.current);
      const price = data.value;
      setHoverPrice(Math.round(100 * price) / 100);
      setHoverDate(hoverEvent.time);
      
      const chartRect = chartRef.current.getBoundingClientRect();
      toolTip.current.style.top = (chartRect.top) + 'px';
      toolTip.current.style.height = (chartRect.height) + 'px';
      toolTip.current.style.left = chartRect.left + hoverEvent.point.x + 'px';
      toolTip.current.style.display = 'block';
    }
};

  /* *************************
            HELPERS
  ************************* */
const minusDaysIso = (isoYYYYMMDD, days) => {
  const date = new Date(isoYYYYMMDD + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

const setRangeByDays = (days, graphRange) => {
  const chart = chartInstance.current;
  if (!chart || chartData.length === 0) return;

  const last = chartData.at(-1).time;
  const from = minusDaysIso(last, days);
  setActiveGraphRange(graphRange);
  chart.timeScale().setVisibleRange({ from, to: last });

  setActiveGraphRange(graphRange);
  suppressNextRangeChangeRef.current = true;
};

const fitContent = () => {
  const chart = chartInstance.current;
  if (!chart) return;
  chart.timeScale().fitContent();
  setActiveGraphRange("ALL");
  suppressNextRangeChangeRef.current = true;
};

  return (
      <div className="w-full p-4 rounded-lg shadow-lg bg-neutral-900">
        <div className="flex justify-end gap-2 mb-2">
        <Button onClick={() => setRangeByDays(1, "1D")} text="1D" isActive={activeGraphRange === "1D"} />
        <Button onClick={() => setRangeByDays(7, "1W")} text="1W" isActive={activeGraphRange === "1W"} />
        <Button onClick={() => setRangeByDays(30, "1M")} text="1M" isActive={activeGraphRange === "1M"} />
        <Button onClick={() => setRangeByDays(365, "1Y")} text="1Y" isActive={activeGraphRange === "1Y"} />
        <Button onClick={fitContent} text="All" isActive={activeGraphRange === "ALL"} />
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
            <div style={{ color: 'rgba( 41, 98, 255, 1)' }}>⬤ Data</div><div style={{ fontSize: '24px', margin: '4px 0px' }}>
              {hoverPrice}
            </div>
            <div>
              {hoverDate}
            </div>
          </div>
        </div>
      </div>  
  );
}

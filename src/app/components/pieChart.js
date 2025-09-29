"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultLabels = ["Tech", "Health", "Energy", "Finance"];
const defaultValues = [40, 25, 20, 15];


export function PieChart({
  labels = defaultLabels,
  values = defaultValues,
  title = "Allocation",
}) {
  const sum = values.reduce((a, b) => a + b, 0);

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: [
          "rgba(59,130,246,0.7)",   // blue-500
          "rgba(16,185,129,0.7)",   // emerald-500
          "rgba(234,179,8,0.7)",    // yellow-500
          "rgba(244,63,94,0.7)",    // rose-500
        ],
        //borderColor: "rgba(255,255,255,0.9)",
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed;
            const p = sum ? ((v / sum) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${v} (${p}%)`;
          },
        },
      },
      title: { display: false },
    },
  };

  return (
    <div className="w-full max-w-sm">
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

"use client";

import { ChartOptions } from "chart.js";
import { ICardReport } from "@/interface";

import { IUserPayment } from "@/interface";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options: ChartOptions<"line"> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#aaa",
      borderWidth: 1,
      padding: 10,
      boxHeight: 20,
      boxWidth: 20,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const HomeLineChart = ({
  duration,
  data,
}: {
  duration: string;
  data: IUserPayment | ICardReport;
}) => {
  return (
    <div style={{ width: 600, height: 300, margin: "0 auto" }}>
      <Line options={options} data={data[duration]} />
    </div>
  );
};

export default HomeLineChart;

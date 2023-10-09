"use client";

import { ChartOptions } from "chart.js";

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

const options: ChartOptions = {
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
};

const HomeLineChart = ({
  duration,
  userPaymentHistory,
}: {
  duration: string;
  userPaymentHistory: IUserPayment;
}) => {
  return (
    <div style={{ width: 600, height: 300 }}>
      <Line options={options} data={userPaymentHistory[duration]} />
    </div>
  );
};

export default HomeLineChart;

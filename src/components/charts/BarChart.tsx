'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        dash: [5, 5],
      },
    },
  },
};

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: '#2563eb',
      borderRadius: 4,
    },
  ],
};

export function OrdersChart() {
  return (
    <div className="h-[300px] p-4">
      <Bar options={options} data={data} />
    </div>
  );
} 
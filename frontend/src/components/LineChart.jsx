import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({data}) => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún'],
    datasets: [
      {
        label: 'Cena za 2024 (M)',
        data: data,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        // tension: 0.5
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Údaje o predaji',
      },
    },
  };


  return (
    <>
      <Line options={options} data={chartData} />
    </>
  );
};

export default LineChart;

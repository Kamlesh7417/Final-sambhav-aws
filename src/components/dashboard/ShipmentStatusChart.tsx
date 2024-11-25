import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ShipmentStatusChart: React.FC = () => {
  const data = {
    labels: [
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled'
    ],
    datasets: [{
      data: [15, 25, 45, 15],
      backgroundColor: [
        '#fbbf24',
        '#60a5fa',
        '#34d399',
        '#f87171'
      ],
      borderColor: [
        '#f59e0b',
        '#3b82f6',
        '#10b981',
        '#ef4444'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20
        }
      }
    }
  };

  return (
    <div className="relative h-[300px]">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">100</p>
          <p className="text-sm text-gray-600">Total Shipments</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatusChart;
// Update RevenueMetrics.tsx
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: t('metrics.revenue'),
      data: [65, 59, 80, 81, 56, 85],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      fill: true,
      tension: 0.4
    },
    {
      label: t('metrics.profit'),
      data: [45, 40, 55, 58, 38, 60],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: t('metrics.revenue_metrics')
    }
  },
  // ... rest of the options
};

return (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {t('metrics.revenue_trends')}
    </h3>
    {/* ... rest of the JSX */}
  </div>
);
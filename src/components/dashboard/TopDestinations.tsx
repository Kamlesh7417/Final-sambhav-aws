// Update TopDestinations.tsx
const data = {
  // ... other data config
  datasets: [
    {
      label: t('metrics.shipment_volume'),
      // ... rest of dataset config
    }
  ]
};

return (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {t('metrics.top_destinations')}
    </h3>
    {/* ... rest of the JSX */}
  </div>
);
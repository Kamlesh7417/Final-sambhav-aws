// Update WorldMap.tsx
return (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {t('metrics.global_presence')}
    </h3>
    {/* ... rest of the JSX */}
    <p className="text-sm text-gray-600">
      {t('metrics.shipment_volume')}: {hub.volume}
    </p>
    {/* ... rest of the JSX */}
  </div>
);
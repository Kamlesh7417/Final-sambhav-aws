// Update ShipmentStatus.tsx
return (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {t('metrics.shipment_status')}
    </h3>
    <div className="h-[300px] relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600">{t('metrics.total_shipments')}</p>
        </div>
      </div>
    </div>
  </div>
);
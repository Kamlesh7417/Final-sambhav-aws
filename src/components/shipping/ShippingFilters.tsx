import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DateRangeFilter from '../common/DateRangeFilter';

interface ShippingFiltersProps {
  orderId: string;
  onOrderIdChange: (id: string) => void;
}

const ShippingFilters: React.FC<ShippingFiltersProps> = ({ orderId = '', onOrderIdChange }) => {
  const [dateRange, setDateRange] = useState<'today' | 'yesterday' | 'week' | 'month' | 'custom' | null>(null);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={orderId}
          onChange={(e) => onOrderIdChange(e.target.value)}
          placeholder="Search by Order ID..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <DateRangeFilter
        dateRange={dateRange}
        customDateRange={customDateRange}
        onDateRangeChange={setDateRange}
        onCustomDateChange={setCustomDateRange}
      />
    </div>
  );
};

export default ShippingFilters;
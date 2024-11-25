import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface OrdersFiltersProps {
  filters: {
    search: string;
    status: string;
  };
  onFilterChange: (filters: { search: string; status: string }) => void;
}

const OrdersFilters: React.FC<OrdersFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();
  const statuses = ['Processing', 'Shipped', 'Delivered'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder={t('orders.search_placeholder')}
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <select
        value={filters.status}
        onChange={handleStatusChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="">{t('orders.all_statuses')}</option>
        {statuses.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default OrdersFilters;
import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

export interface FilterBarProps {
  orderId: string;
  dateRange: 'today' | 'week' | 'month' | 'custom' | null;
  customDateRange: {
    start: Date | null;
    end: Date | null;
  };
  status: string;
  onOrderIdChange: (value: string) => void;
  onDateRangeChange: (range: 'today' | 'week' | 'month' | 'custom' | null) => void;
  onCustomDateChange: (dates: { start: Date | null; end: Date | null }) => void;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
  statuses: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  orderId,
  dateRange,
  status,
  onOrderIdChange,
  onDateRangeChange,
  onStatusChange,
  onClearFilters,
  statuses
}) => {
  const hasActiveFilters = orderId || dateRange || status;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={orderId}
            onChange={(e) => onOrderIdChange(e.target.value)}
            placeholder="Search by Order ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        {statuses.length > 0 && (
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-[180px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}

        {/* Date Range Filter */}
        <select
          value={dateRange || ''}
          onChange={(e) => onDateRangeChange(e.target.value as any)}
          className="w-[180px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <XCircleIcon className="h-5 w-5" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default FilterBar;
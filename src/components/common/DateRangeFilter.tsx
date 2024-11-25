import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeFilterProps {
  dateRange: 'today' | 'yesterday' | 'week' | 'month' | 'custom' | null;
  customDateRange: {
    start: Date | null;
    end: Date | null;
  };
  onDateRangeChange: (range: 'today' | 'yesterday' | 'week' | 'month' | 'custom' | null) => void;
  onCustomDateChange: (dates: { start: Date | null; end: Date | null }) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  customDateRange,
  onDateRangeChange,
  onCustomDateChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={dateRange || ''}
        onChange={(e) => onDateRangeChange(e.target.value as any)}
        className="rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="week">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
        <option value="custom">Custom Range</option>
      </select>

      {dateRange === 'custom' && (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <DatePicker
              selected={customDateRange.start}
              onChange={(date) => onCustomDateChange({
                ...customDateRange,
                start: date
              })}
              className="pl-10 rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
              placeholderText="Start Date"
              maxDate={new Date()}
              isClearable
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <DatePicker
              selected={customDateRange.end}
              onChange={(date) => onCustomDateChange({
                ...customDateRange,
                end: date
              })}
              className="pl-10 rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
              placeholderText="End Date"
              maxDate={new Date()}
              minDate={customDateRange.start}
              isClearable
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
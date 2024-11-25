import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setFilters, setPage } from '../store/slices/orderSlice';
import OrderDetails from '../components/orders/OrderDetails';
import OrdersTable from '../components/orders/OrdersTable';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, filters, pagination } = useSelector((state: RootState) => state.orders);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom' | null>(null);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  const handleFiltersChange = (newFilters: any) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
  };

  const clearFilters = () => {
    dispatch(setFilters({ search: '', status: null }));
    setDateRange(null);
    setCustomDateRange({ start: null, end: null });
    dispatch(setPage(1));
  };

  const filteredOrders = Object.values(orders).filter(order => {
    let matches = true;

    if (filters.search) {
      matches = matches && order.order_id.toLowerCase().includes(filters.search.toLowerCase());
    }

    if (filters.status) {
      matches = matches && order.order_status === filters.status;
    }

    if (dateRange || (customDateRange.start && customDateRange.end)) {
      const orderDate = new Date(order.order_placed_timestamp);
      const today = new Date();
      
      if (dateRange === 'today') {
        matches = matches && orderDate.toDateString() === today.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        matches = matches && orderDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        matches = matches && orderDate >= monthAgo;
      } else if (customDateRange.start && customDateRange.end) {
        matches = matches && orderDate >= customDateRange.start && orderDate <= customDateRange.end;
      }
    }

    return matches;
  });

  // Pagination
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Orders
      </motion.h1>

      <FilterBar
        orderId={filters.search}
        dateRange={dateRange}
        customDateRange={customDateRange}
        status={filters.status || ''}
        onOrderIdChange={(value) => handleFiltersChange({ ...filters, search: value })}
        onDateRangeChange={setDateRange}
        onCustomDateChange={setCustomDateRange}
        onStatusChange={(value) => handleFiltersChange({ ...filters, status: value })}
        onClearFilters={clearFilters}
        statuses={['OPEN', 'SHIPPED', 'DELIVERED']}
      />

      <div className="glass-card p-6">
        <OrdersTable
          orders={paginatedOrders}
          loading={loading}
          onOrderClick={handleOrderClick}
        />
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={(page) => dispatch(setPage(page))}
      />

      {showDetails && selectedOrderId && orders[selectedOrderId] && (
        <OrderDetails
          order={orders[selectedOrderId]}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Orders;
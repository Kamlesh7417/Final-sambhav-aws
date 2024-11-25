import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setFilters, setPage } from '../store/slices/shipmentSlice';
import ShipmentCard from '../components/shipping/ShipmentCard';
import ShipmentDetails from '../components/shipping/ShipmentDetails';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';

const Shipments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shipments, loading, filters, pagination } = useSelector((state: RootState) => state.shipments);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom' | null>(null);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

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

  const filteredShipments = Object.values(shipments).filter(shipment => {
    let matches = true;

    if (filters.search) {
      matches = matches && (
        shipment.orderId.toLowerCase().includes(filters.search.toLowerCase()) ||
        shipment.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status) {
      matches = matches && shipment.status === filters.status;
    }

    if (dateRange || (customDateRange.start && customDateRange.end)) {
      const shipmentDate = new Date(shipment.eta);
      const today = new Date();
      
      if (dateRange === 'today') {
        matches = matches && shipmentDate.toDateString() === today.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        matches = matches && shipmentDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        matches = matches && shipmentDate >= monthAgo;
      } else if (customDateRange.start && customDateRange.end) {
        matches = matches && shipmentDate >= customDateRange.start && shipmentDate <= customDateRange.end;
      }
    }

    return matches;
  });

  // Pagination
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedShipments = filteredShipments.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Shipments
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
        statuses={['Order Received', 'Order Picked', 'Order in Transit', 'Out For Delivery', 'Reached Destination']}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedShipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              onClick={() => setSelectedShipmentId(shipment.id)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalItems={filteredShipments.length}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={(page) => dispatch(setPage(page))}
      />

      {selectedShipmentId && shipments[selectedShipmentId] && (
        <ShipmentDetails
          shipment={shipments[selectedShipmentId]}
          onClose={() => setSelectedShipmentId(null)}
        />
      )}
    </div>
  );
};

export default Shipments;
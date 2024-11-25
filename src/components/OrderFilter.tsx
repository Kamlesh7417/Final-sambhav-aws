import React from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '../services/api';

interface OrderFilterProps {
  onFilterChange: (orderId: string) => void;
  selectedOrderId: string;
  orders: Record<string, Order>;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onFilterChange, selectedOrderId, orders }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          value={selectedOrderId}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="">All Orders</option>
          {Object.values(orders).map((order) => (
            <option key={order.order_id} value={order.order_id}>
              {order.order_id} - {order.customer}
            </option>
          ))}
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Filter className="h-5 w-5 text-gray-600" />
        <span>More Filters</span>
      </motion.button>
    </div>
  );
};

export default OrderFilter;
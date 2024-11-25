import React from 'react';
import { motion } from 'framer-motion';

interface OrdersHeaderProps {
  onRefresh: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ onRefresh }) => {
  return (
    <div className="flex items-center justify-between">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Orders
      </motion.h1>
    </div>
  );
};

export default OrdersHeader;
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { useOrders } from '../hooks/useOrders';
import { useShipments } from '../hooks/useShipments';
import RevenueChart from '../components/dashboard/RevenueChart';
import ShipmentStatusChart from '../components/dashboard/ShipmentStatusChart';
import TopDestinationsChart from '../components/dashboard/TopDestinationsChart';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import RecentUpdates from '../components/dashboard/RecentUpdates';

const Dashboard = () => {
  const { t } = useTranslation();
  const { orders } = useOrders();
  const { shipments } = useShipments();

  const stats = [
    { 
      icon: ShoppingBagIcon, 
      label: 'Total Orders', 
      value: Object.keys(orders).length, 
      change: '+12%',
      color: 'from-orange-500 to-pink-500'
    },
    { 
      icon: TruckIcon, 
      label: 'Active Shipments', 
      value: Object.values(shipments).filter(s => s.status === 'Order in Transit').length, 
      change: '+8%',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: CurrencyDollarIcon, 
      label: 'Monthly Revenue', 
      value: '₹12.4L', 
      change: '+15%',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: DocumentTextIcon, 
      label: 'Pending Documents', 
      value: '23', 
      change: '-5%',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 transform rotate-45"></div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Revenue Analysis
            </h3>
            <RevenueChart />
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipment Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Shipment Status Overview
              </h3>
              <ShipmentStatusChart />
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Analytics
              </h3>
              <PerformanceMetrics />
            </motion.div>
          </div>

          {/* Top Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Export Destinations
            </h3>
            <TopDestinationsChart />
          </motion.div>
        </div>

        {/* Updates Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <RecentUpdates />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
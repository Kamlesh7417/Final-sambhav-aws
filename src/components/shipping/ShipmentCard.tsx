import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarIcon, 
  ShoppingBagIcon, 
  ExclamationCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { Shipment } from '../../utils/mockData';

interface ShipmentCardProps {
  shipment: Shipment;
  onClick: () => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order Received':
        return 'bg-yellow-100 text-yellow-800';
      case 'Order Picked':
        return 'bg-blue-100 text-blue-800';
      case 'Order in Transit':
        return 'bg-purple-100 text-purple-800';
      case 'Out For Delivery':
        return 'bg-orange-100 text-orange-800';
      case 'Reached Destination':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 40) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {shipment.tracking_number}
            </h3>
            <p className="text-sm text-gray-500">Order #{shipment.orderId}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{shipment.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${shipment.progress}%` }}
              transition={{ duration: 1 }}
              className={`h-full rounded-full ${getProgressColor(shipment.progress)}`}
            />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{shipment.origin}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{shipment.destination}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">ETA: {new Date(shipment.eta).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{shipment.type}</span>
          </div>
        </div>

        {/* Latest Update */}
        <div className="pt-4 border-t">
          <div className="flex items-start space-x-2">
            <ExclamationCircleIcon className="h-4 w-4 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600">{shipment.lastUpdate}</p>
              <p className="text-xs text-gray-500">
                {new Date(shipment.tracking[shipment.tracking.length - 1].timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TruckIcon className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-gray-900">{shipment.carrier}</span>
          </div>
          <span className="text-sm text-primary-600">View Details →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ShipmentCard;
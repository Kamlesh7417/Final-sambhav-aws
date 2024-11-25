import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  TruckIcon,
  CheckCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface ShipmentEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
  type: 'Order Received' | 'Order Picked' | 'Order in Transit' | 'Out For Delivery' | 'Reached Destination';
}

interface ShipmentTimelineProps {
  events: ShipmentEvent[];
}

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ events }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Order Received':
        return DocumentTextIcon;
      case 'Order Picked':
        return BuildingOfficeIcon;
      case 'Order in Transit':
        return TruckIcon;
      case 'Out For Delivery':
        return TruckIcon;
      case 'Reached Destination':
        return CheckCircleIcon;
      default:
        return TruckIcon;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'Order Received':
        return 'bg-green-100 text-green-600';
      case 'Order Picked':
        return 'bg-blue-100 text-blue-600';
      case 'Order in Transit':
        return 'bg-purple-100 text-purple-600';
      case 'Out For Delivery':
        return 'bg-orange-100 text-orange-600';
      case 'Reached Destination':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const allStatuses = [
    'Order Received',
    'Order Picked',
    'Order in Transit',
    'Out For Delivery',
    'Reached Destination'
  ];

  const currentStatusIndex = Math.max(
    0,
    allStatuses.findIndex(status => 
      events.some(event => event.type === status)
    )
  );

  return (
    <div className="relative py-8">
      {/* Progress Line */}
      <div className="absolute left-0 right-0 top-[52px] h-0.5 bg-gray-200">
        <motion.div 
          className="absolute left-0 top-0 h-0.5 bg-primary-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStatusIndex / (allStatuses.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Status Points */}
      <div className="grid grid-cols-5 gap-4">
        {allStatuses.map((status, index) => {
          const event = events.find(e => e.type === status);
          const isCompleted = index <= currentStatusIndex;
          const isCurrent = index === currentStatusIndex;

          return (
            <div key={status} className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, type: "spring" }}
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  isCompleted ? getStatusColor(status) : 'bg-gray-100 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
              >
                {React.createElement(getIcon(status), { className: "h-6 w-6" })}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="mt-4 text-center"
              >
                <h3 className={`text-sm font-medium ${
                  isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {status}
                </h3>
                {event && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-500 mt-1"
                  >
                    {new Date(event.timestamp).toLocaleDateString()}
                  </motion.p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentTimeline;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BellIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const notifications = [
  {
    id: 1,
    type: 'order',
    icon: ShoppingBagIcon,
    title: 'New Order Received',
    message: 'Order #ORD003 has been placed by Global Electronics',
    time: '5 minutes ago',
    priority: 'high',
  },
  {
    id: 2,
    type: 'shipment',
    icon: TruckIcon,
    title: 'Shipment Delayed',
    message: 'SHP001 is experiencing delays at customs',
    time: '1 hour ago',
    priority: 'urgent',
  },
  {
    id: 3,
    type: 'document',
    icon: DocumentTextIcon,
    title: 'Document Required',
    message: 'Additional customs documentation needed for ORD002',
    time: '2 hours ago',
    priority: 'medium',
  },
];

const Notifications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-4 max-h-[400px] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <span className="bg-primary-100 text-primary-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {notifications.length} New
        </span>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer
              ${notification.priority === 'urgent' ? 'bg-red-50' : ''}
              ${notification.priority === 'high' ? 'bg-orange-50' : ''}
              ${notification.priority === 'medium' ? 'bg-blue-50' : ''}
            `}
          >
            <div className={`p-2 rounded-full
              ${notification.priority === 'urgent' ? 'bg-red-100 text-red-600' : ''}
              ${notification.priority === 'high' ? 'bg-orange-100 text-orange-600' : ''}
              ${notification.priority === 'medium' ? 'bg-blue-100 text-blue-600' : ''}
            `}>
              <notification.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notifications;
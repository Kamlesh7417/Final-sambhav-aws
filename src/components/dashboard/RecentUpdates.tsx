import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BellIcon,
  ShoppingBagIcon,
  TruckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const RecentUpdates: React.FC = () => {
  const { t } = useTranslation();

  const updates = [
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
    }
  ];

  return (
    <div className="glass-card">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Updates
        </h3>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Notifications
            </h4>
            <span className="bg-primary-100 text-primary-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {updates.length} New
            </span>
          </div>

          <div className="space-y-4">
            {updates.map((update) => (
              <motion.div
                key={update.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer
                  ${update.priority === 'urgent' ? 'bg-red-50' : ''}
                  ${update.priority === 'high' ? 'bg-orange-50' : ''}
                  ${update.priority === 'medium' ? 'bg-blue-50' : ''}
                `}
              >
                <div className={`p-2 rounded-full
                  ${update.priority === 'urgent' ? 'bg-red-100 text-red-600' : ''}
                  ${update.priority === 'high' ? 'bg-orange-100 text-orange-600' : ''}
                  ${update.priority === 'medium' ? 'bg-blue-100 text-blue-600' : ''}
                `}>
                  <update.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                  <p className="text-sm text-gray-600">{update.message}</p>
                  <span className="text-xs text-gray-500">{update.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View All
        </motion.button>
      </div>
    </div>
  );
};

export default RecentUpdates;
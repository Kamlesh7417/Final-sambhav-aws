import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Truck, Ship, Plane } from 'lucide-react';

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  description: string;
  type: 'pickup' | 'transit' | 'customs' | 'delivery' | 'exception' | 'negotiation';
}

interface ShipmentTrackingProps {
  shipmentId: string;
  events: TrackingEvent[];
  estimatedDelivery: string;
  currentLocation: string;
  transportMode: 'sea' | 'air' | 'road';
  status: string;
  progress: number;
}

const ShipmentTracking: React.FC<ShipmentTrackingProps> = ({
  shipmentId,
  events,
  estimatedDelivery,
  currentLocation,
  transportMode,
  status,
  progress
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pickup':
        return Package;
      case 'transit':
        return transportMode === 'sea' ? Ship : transportMode === 'air' ? Plane : Truck;
      case 'customs':
        return MapPin;
      case 'delivery':
        return Package;
      default:
        return MapPin;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Shipment #{shipmentId}</h2>
          <p className="text-sm text-gray-500">Estimated delivery: {estimatedDelivery}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            status === 'On Time' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-2 bg-primary-500 rounded-full"
          />
        </div>
        <div className="absolute top-4 left-0 w-full flex justify-between text-sm text-gray-500">
          <span>Origin</span>
          <span>In Transit</span>
          <span>Destination</span>
        </div>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className={`p-2 rounded-full ${
              event.type === 'exception' ? 'bg-red-100 text-red-600' :
              event.type === 'negotiation' ? 'bg-blue-100 text-blue-600' :
              'bg-primary-100 text-primary-600'
            }`}>
              {React.createElement(getIcon(event.type), { className: "h-5 w-5" })}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{event.status}</h3>
                <span className="text-sm text-gray-500">{event.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-sm text-gray-500 mt-1">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTracking;
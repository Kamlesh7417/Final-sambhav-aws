import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Order } from '../../utils/mockData';
import PaymentModal from './PaymentModal';

interface ShippingRecommendationsProps {
  order: Order;
  onClose: () => void;
}

const carrierOptions = [
  {
    id: 'dhl',
    carrier: 'DHL',
    logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
    service: 'Express Air Freight',
    deliveryTime: '1-2 days',
    originalPrice: 950,
    negotiatedPrice: 850,
    rating: 4.8,
    isBestOption: true
  },
  {
    id: 'fedex',
    carrier: 'FedEx',
    logo: 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png',
    service: 'Priority Freight',
    deliveryTime: '2-3 days',
    originalPrice: 850,
    negotiatedPrice: 780,
    rating: 4.7
  },
  {
    id: 'ups',
    carrier: 'UPS',
    logo: 'https://www.ups.com/assets/resources/images/UPS_logo.svg',
    service: 'Express Saver',
    deliveryTime: '2-3 days',
    originalPrice: 880,
    negotiatedPrice: 800,
    rating: 4.6
  },
  {
    id: 'bluedart',
    carrier: 'Bluedart',
    logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgODAiPjxwYXRoIGZpbGw9IiMwMDM0NzgiIGQ9Ik00My41IDBoMTUzdjgwSDQzLjV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY4LjUgMjBoMTAzdjQwSDY4LjV6Ii8+PHRleHQgeD0iNzMuNSIgeT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzAwMzQ3OCI+Qmx1ZWRhcnQ8L3RleHQ+PC9zdmc+',
    service: 'Surface Express',
    deliveryTime: '3-4 days',
    originalPrice: 750,
    negotiatedPrice: 680,
    rating: 4.5
  }
];

const ShippingRecommendations: React.FC<ShippingRecommendationsProps> = ({ order, onClose }) => {
  const [selectedCarrier, setSelectedCarrier] = useState<typeof carrierOptions[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleCarrierSelect = (carrier: typeof carrierOptions[0]) => {
    setSelectedCarrier(carrier);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-4xl m-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Shipping Options</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carrierOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 ${
                  selectedCarrier?.id === option.id 
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleCarrierSelect(option)}
              >
                {/* Carrier Logo */}
                <div className="flex justify-between items-start mb-4">
                  <img 
                    src={option.logo} 
                    alt={option.carrier} 
                    className="h-8 object-contain"
                  />
                  {option.isBestOption && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      <SparklesIcon className="h-3 w-3 mr-1" />
                      Best Option
                    </span>
                  )}
                </div>

                {/* Service Details */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{option.service}</h3>
                    <p className="text-sm text-gray-500">{option.deliveryTime} delivery</p>
                  </div>

                  {/* Price */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Original Price</span>
                      <span className="line-through">₹{option.originalPrice}</span>
                    </div>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-sm text-green-600">AI Negotiated Price</span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{option.negotiatedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{option.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {showPayment && selectedCarrier && (
        <PaymentModal
          amount={selectedCarrier.negotiatedPrice}
          carrierName={selectedCarrier.carrier}
          orderId={order.order_id}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </motion.div>
  );
};

export default ShippingRecommendations;
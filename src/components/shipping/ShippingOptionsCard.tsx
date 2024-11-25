import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';
import NegotiationChat, { NegotiationMessage } from './NegotiationChat';

interface ShippingOption {
  carrier: string;
  logo: string;
  service: string;
  deliveryTime: string;
  originalPrice: number;
  negotiatedPrice: number;
  rating: number;
  isBestOption?: boolean;
}

interface ShippingOptionsCardProps {
  data: ShippingOption[];
  onSelect: (option: ShippingOption) => void;
}

const carrierLogos = {
  'DHL': 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
  'UPS': 'https://www.ups.com/assets/resources/images/UPS_logo.svg',
  'FedEx': 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png',
  'Bluedart': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgODAiPjxwYXRoIGZpbGw9IiMwMDM0NzgiIGQ9Ik00My41IDBoMTUzdjgwSDQzLjV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTY4LjUgMjBoMTAzdjQwSDY4LjV6Ii8+PHRleHQgeD0iNzMuNSIgeT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzAwMzQ3OCI+Qmx1ZWRhcnQ8L3RleHQ+PC9zdmc+'
};

const ShippingOptionsCard: React.FC<ShippingOptionsCardProps> = ({ data, onSelect }) => {
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(null);

  const calculateDiscount = (original: number, negotiated: number) => {
    return Math.round(((original - negotiated) / original) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((option, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
            option.isBestOption ? 'ring-2 ring-primary-500' : ''
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <img 
                src={carrierLogos[option.carrier as keyof typeof carrierLogos]} 
                alt={option.carrier} 
                className="h-8 object-contain"
              />
            </div>
            {option.isBestOption && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                <SparklesIcon className="h-4 w-4" />
                <span className="text-xs font-medium">AI Recommended</span>
              </div>
            )}
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            {/* Delivery Time */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery Time</span>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium">{option.deliveryTime}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Rating</span>
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="font-medium">{option.rating}/5.0</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-4 p-3 bg-white rounded-lg">
              {/* Original Price */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price</span>
                <span className="text-gray-500 line-through">
                  ₹{option.originalPrice.toLocaleString()}
                </span>
              </div>
              
              {/* AI Negotiated Price */}
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <span className="text-green-600 text-sm font-medium">
                  AI Negotiated Price
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ₹{option.negotiatedPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">
                    Save {calculateDiscount(option.originalPrice, option.negotiatedPrice)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
            className={`w-full mt-6 px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
              option.isBestOption 
                ? 'bg-primary-600 hover:bg-primary-700'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            Select
          </motion.button>
        </motion.div>
      ))}

      {showNegotiation && selectedOption && (
        <NegotiationChat
          messages={[]}
          originalPrice={selectedOption.originalPrice}
          finalPrice={selectedOption.negotiatedPrice}
          onClose={() => setShowNegotiation(false)}
        />
      )}
    </div>
  );
};

export default ShippingOptionsCard;
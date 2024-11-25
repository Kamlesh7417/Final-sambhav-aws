import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShippingOption {
  carrier: string;
  logo: string;
  service: string;
  days: string;
  originalPrice: number;
  discountedPrice: number;
  aiSavings: number;
  reliability: number;
  count: number;
  type: string;
  co2: number;
  customs: string;
  documentation: string[];
}

interface ShippingOptionsTableProps {
  data: ShippingOption[];
  onSelect: (option: ShippingOption) => void;
}

const ShippingOptionsTable: React.FC<ShippingOptionsTableProps> = ({ data, onSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Carrier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transit Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((option, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img src={option.logo} alt={option.carrier} className="h-8 w-auto mr-3" />
                  <span className="font-medium">{option.carrier}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{option.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {option.days} days
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium">₹{option.discountedPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 line-through">₹{option.originalPrice.toLocaleString()}</div>
                  <div className="text-xs text-green-600">Save ₹{option.aiSavings.toLocaleString()}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(option)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Select
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingOptionsTable;
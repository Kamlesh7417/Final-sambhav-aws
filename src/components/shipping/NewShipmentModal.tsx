import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBagIcon,
  MapPinIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useOrders } from '../../hooks/useOrders';
import { useAI } from '../../hooks/useAI';
import ShippingOptionsCard from './ShippingOptionsCard';

interface NewShipmentModalProps {
  onClose: () => void;
  orderId?: string;
}

const shippingOptions = [
  {
    carrier: 'Maersk',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png',
    service: 'Standard Sea Freight',
    days: '30-35',
    originalPrice: 55000,
    discountedPrice: 52000,
    aiSavings: 3000,
    reliability: 98,
    count: 150,
    type: 'Cost-Effective',
    co2: 450,
    customs: 'Standard',
    documentation: ['Bill of Lading', 'Commercial Invoice', 'Packing List']
  },
  {
    carrier: 'DHL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL_Logo.svg/2560px-DHL_Logo.svg.png',
    service: 'Air Freight Express',
    days: '5-7',
    originalPrice: 95000,
    discountedPrice: 90000,
    aiSavings: 5000,
    reliability: 99.5,
    count: 50,
    type: 'Best Option',
    co2: 850,
    customs: 'Fast Track',
    documentation: ['Air Waybill', 'Commercial Invoice', 'Customs Declaration']
  },
  {
    carrier: 'MSC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/MSC_Logo.svg/2560px-MSC_Logo.svg.png',
    service: 'Express Sea Freight',
    days: '25-30',
    originalPrice: 65000,
    discountedPrice: 61000,
    aiSavings: 4000,
    reliability: 97,
    count: 80,
    type: 'Balanced',
    co2: 500,
    customs: 'Priority',
    documentation: ['Bill of Lading', 'Commercial Invoice', 'Certificate of Origin']
  }
];

const NewShipmentModal: React.FC<NewShipmentModalProps> = ({ onClose, orderId = '' }) => {
  const [step, setStep] = useState(1);
  const [searchOrderId, setSearchOrderId] = useState(orderId);
  const { orders, loading: ordersLoading } = useOrders();
  const { suggestions, loading: aiLoading } = useAI(searchOrderId);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    quantity: ''
  });

  useEffect(() => {
    if (suggestions) {
      setFormData({
        origin: suggestions.origin || '',
        destination: suggestions.destination || '',
        weight: suggestions.weight || '',
        dimensions: suggestions.dimensions || '',
        quantity: '1',
      });
    }
  }, [suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedOrder = orders[searchOrderId];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Order
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Enter Order ID..."
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start space-x-3">
                  <SparklesIcon className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium text-primary-800">Order Found: #{searchOrderId}</h4>
                    <p className="text-sm text-primary-600 mt-1">
                      Customer: {selectedOrder.customer}
                    </p>
                    <p className="text-sm text-primary-600">
                      Type: {selectedOrder.type}
                    </p>
                    <p className="text-sm text-primary-600">
                      Priority: {selectedOrder.priority}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Origin
                  </label>
                  <div className="mt-1 relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter origin location"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <div className="mt-1 relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Enter destination location"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Details
                </label>
                <div className="mt-1 grid grid-cols-3 gap-4">
                  <div className="relative">
                    <ShoppingBagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Weight (kg)"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div className="relative">
                    <ShoppingBagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      placeholder="Dimensions (cm)"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div className="relative">
                    <ShoppingBagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Quantity"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {aiLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <SparklesIcon className="h-5 w-5 text-primary-600 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-primary-800">AI Recommendations</h4>
                      <p className="text-sm text-primary-600 mt-1">
                        Based on your shipment details and historical data, here are the best options:
                      </p>
                    </div>
                  </div>
                </div>

                <ShippingOptionsCard
                  data={shippingOptions}
                  onSelect={(option) => setSelectedOption(option)}
                />
              </>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {selectedOption && (
              <>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carrier</span>
                      <span className="font-medium">{selectedOption.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service</span>
                      <span className="font-medium">{selectedOption.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Time</span>
                      <span className="font-medium">{selectedOption.days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost</span>
                      <div className="text-right">
                        <div className="font-medium">₹{selectedOption.discountedPrice.toLocaleString()}</div>
                        <div className="text-sm text-green-600">
                          Save ₹{selectedOption.aiSavings.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 flex items-start space-x-3">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800">Environmental Impact</h4>
                    <p className="text-sm text-green-600">
                      This route will produce {selectedOption.co2}kg of CO₂. We've optimized for the most eco-friendly option
                      while maintaining your delivery requirements.
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Create New Shipment
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
                {i !== 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > i ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  onClose();
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-md hover:from-primary-600 hover:to-accent-600 ml-auto"
              disabled={step === 2 && !selectedOption}
            >
              {step === 3 ? 'Create Shipment' : 'Next'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewShipmentModal;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Order } from '../../utils/mockData';
import ShippingLabel from './ShippingLabel';
import ShippingRecommendations from './ShippingRecommendations';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const [showLabel, setShowLabel] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [labelGenerated, setLabelGenerated] = useState(false);

  const handlePaymentSuccess = () => {
    setShowRecommendations(false);
    setPaymentCompleted(true);
    setShowLabel(true);
  };

  const handleLabelGenerated = () => {
    setLabelGenerated(true);
    setShowLabel(false);
    // Close the entire order details after a short delay
    setTimeout(() => {
      onClose();
    }, 500);
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
        className="glass-card w-full max-w-2xl m-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order #{order.order_id}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Placed on: {new Date(order.order_placed_timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Details */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Product Name</p>
                <p className="font-medium">{order.product.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Dimensions</p>
                  <p className="font-medium">{order.product.dimensions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="font-medium">{order.product.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{order.product.quantity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="glass-card p-4 space-y-4">
            <h3 className="font-medium text-gray-900 mb-2">Addresses</h3>
            <div>
              <p className="text-sm text-gray-600">Customer Address</p>
              <p className="font-medium whitespace-pre-line">{order.customer_address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Warehouse Address</p>
              <p className="font-medium whitespace-pre-line">{order.warehouse_address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Seller Address</p>
              <p className="font-medium whitespace-pre-line">{order.seller_address}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {labelGenerated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-2 p-4 bg-green-50 text-green-700 rounded-lg"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Label generated successfully!</span>
              </motion.div>
            )}

            <div className="flex gap-4">
              {!paymentCompleted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRecommendations(true)}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Calculate Shipping Cost
                </motion.button>
              ) : (
                <>
                  {!labelGenerated && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowLabel(true)}
                      className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Print Label
                    </motion.button>
                  )}
                  {labelGenerated && (
                    <div className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg flex items-center justify-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5" />
                      <span>Label Generated</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shipping Label Modal */}
      {showLabel && (
        <ShippingLabel
          order={order}
          onClose={() => setShowLabel(false)}
          onGenerated={handleLabelGenerated}
        />
      )}

      {/* Shipping Recommendations Modal */}
      {showRecommendations && (
        <ShippingRecommendations
          order={order}
          onClose={handlePaymentSuccess}
        />
      )}
    </motion.div>
  );
};

export default OrderDetails;
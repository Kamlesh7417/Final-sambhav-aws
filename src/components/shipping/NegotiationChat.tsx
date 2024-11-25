import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

export interface NegotiationMessage {
  id: string;
  sender: 'ai' | 'carrier';
  message: string;
  timestamp: string;
  priceQuote?: number;
}

interface NegotiationChatProps {
  messages: NegotiationMessage[];
  originalPrice: number;
  finalPrice: number;
  onClose: () => void;
}

const NegotiationChat: React.FC<NegotiationChatProps> = ({
  messages,
  originalPrice,
  finalPrice,
  onClose,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price).replace('INR', '₹');
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
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Negotiation</h3>
                <p className="text-sm text-gray-600">Watch AI negotiate the best price for you</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Original:</span>
                <span className="ml-2 line-through">{formatPrice(originalPrice)}</span>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-gray-400" />
              <div className="text-sm">
                <span className="text-gray-500">Final:</span>
                <span className="ml-2 text-green-600 font-medium">{formatPrice(finalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 h-[400px] overflow-y-auto bg-gradient-radial from-white to-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-900'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'
                } shadow-sm`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.sender === 'ai' ? (
                      <SparklesIcon className="h-4 w-4 text-primary-600" />
                    ) : (
                      <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                  {message.priceQuote && (
                    <div className="mt-2 text-sm font-medium bg-white/50 p-2 rounded-lg">
                      Quote: {formatPrice(message.priceQuote)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                Successfully saved {formatPrice(originalPrice - finalPrice)}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NegotiationChat;
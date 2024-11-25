import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface NegotiationMessage {
  id: string;
  timestamp: string;
  message: string;
  savings?: number;
}

interface AIChatProps {
  messages: NegotiationMessage[];
  totalSavings: number;
}

const AIChat: React.FC<AIChatProps> = ({ messages, totalSavings }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price).replace('INR', '₹');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary-600" />
          <h3 className="font-medium text-gray-900">AI Negotiation History</h3>
        </div>
        <span className="text-sm font-medium text-green-600">
          Total Savings: {formatPrice(totalSavings)}
        </span>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3"
          >
            <div className="flex-shrink-0 text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">{message.message}</p>
              {message.savings && (
                <p className="text-xs text-green-600 mt-1">
                  Savings: {formatPrice(message.savings)}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIChat;
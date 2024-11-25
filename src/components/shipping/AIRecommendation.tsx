import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

interface AIRecommendationProps {
  orderId: string;
  recommendation: {
    carrier: string;
    service: string;
    reason: string;
    savings: number;
    time: string;
  };
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ orderId, recommendation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg mb-6"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-white p-2 rounded-lg">
          <Sparkles className="h-6 w-6 text-primary-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            AI Recommendation for Order #{orderId}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700">Best Option: {recommendation.carrier}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700">Transit Time: {recommendation.time}</span>
            </div>
            
            <div className="text-green-600 font-medium">
              Potential Savings: ₹{recommendation.savings.toLocaleString()}
            </div>
          </div>
          
          <p className="text-primary-600">{recommendation.reason}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendation;
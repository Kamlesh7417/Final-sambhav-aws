import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIAssistantProps {
  loading: boolean;
  suggestions: any;
  error?: string | null;
  onApply: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  loading,
  suggestions,
  error,
  onApply,
}) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 flex items-center space-x-3"
      >
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-600 border-t-transparent" />
        <p className="text-primary-600">AI is analyzing your order...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!suggestions) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(suggestions).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onApply}
        className="mt-4 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
      >
        Apply AI Suggestions
      </motion.button>
    </motion.div>
  );
};

export default AIAssistant;
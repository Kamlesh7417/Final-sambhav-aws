import React from 'react';
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryAttempt?: number;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message, 
  onRetry, 
  isRetrying = false,
  retryAttempt = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-red-50 flex items-start space-x-4"
    >
      <ExclamationCircleIcon className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="text-lg font-medium text-red-800 mb-2">Connection Error</h3>
        <p className="text-red-700">{message}</p>
        {isRetrying && (
          <p className="text-sm text-red-600 mt-2">
            Retrying connection... (Attempt {retryAttempt} of 3)
          </p>
        )}
        {onRetry && !isRetrying && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            <ArrowPathIcon className={`h-5 w-5 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>Retry Connection</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorAlert;
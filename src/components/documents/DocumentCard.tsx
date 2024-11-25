import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Document } from '../../utils/mockData';

interface DocumentCardProps {
  document: Document;
  onView: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Final':
        return 'bg-green-100 text-green-800';
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDocumentClick = () => {
    window.open(document.url, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary-50 rounded-lg">
              <DocumentTextIcon className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{document.name}</h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <ClockIcon className="h-3 w-3" />
                <span>{new Date(document.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDocumentClick}
            className="p-1.5 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50"
          >
            <EyeIcon className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs">
          <span className={`px-2 py-0.5 rounded-full ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
          <span className="text-gray-500">{document.size}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
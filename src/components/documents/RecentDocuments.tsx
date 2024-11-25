import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Clock } from 'lucide-react';

interface RecentDocument {
  id: string;
  name: string;
  orderId: string;
  type: string;
  timestamp: string;
  size: string;
}

interface RecentDocumentsProps {
  documents: RecentDocument[];
  onView: (doc: RecentDocument) => void;
  onDownload: (doc: RecentDocument) => void;
  className?: string;
}

const RecentDocuments: React.FC<RecentDocumentsProps> = ({
  documents,
  onView,
  onDownload,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Recent Documents</h3>
        <Clock className="h-5 w-5 text-gray-500" />
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary-50">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <p className="text-sm text-gray-500">
                    Order: {doc.orderId} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onView(doc)}
                  className="p-1 text-gray-500 hover:text-primary-600"
                >
                  <Eye className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDownload(doc)}
                  className="p-1 text-gray-500 hover:text-primary-600"
                >
                  <Download className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;
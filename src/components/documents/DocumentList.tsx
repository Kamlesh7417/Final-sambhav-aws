import React from 'react';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Document } from '../../utils/mockData';

interface DocumentListProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onView,
  onDownload,
  onDelete,
}) => {
  const documentTypes = {
    'Invoice': ['Commercial Invoice', 'Proforma Invoice'],
    'Packing List': ['Packing List', 'Weight List'],
    'Certificate of Origin': ['Certificate of Origin', 'Export License'],
    'Other': ['RCMC', 'IEC', 'AD Code'],
  };

  return (
    <div className="space-y-8">
      {Object.entries(documentTypes).map(([category, types]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {types.map((type) => {
              const doc = documents.find(d => d.name === type);
              
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-primary-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{type}</h4>
                        {doc && (
                          <p className="text-sm text-gray-500">
                            Last updated: {new Date(doc.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {doc && (
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
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDelete(doc)}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Barcode from 'react-barcode';

interface DocumentViewerProps {
  document: {
    id: string;
    name: string;
    orderId: string;
    type: string;
    carrier?: string;
    trackingNumber?: string;
  };
  onClose: () => void;
}

const carrierLogos = {
  'DHL Express': 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
  'FedEx': 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png',
  'UPS': 'https://www.ups.com/assets/resources/images/UPS_logo.svg'
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
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
        className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
                <p className="text-sm text-gray-600">Order #{document.orderId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg mb-6">
            <div className="space-y-6">
              {/* Document Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{document.name}</h2>
                <p className="text-gray-600">Document ID: {document.id}</p>
              </div>

              {/* Carrier Logo for Shipping Labels */}
              {document.type === 'Label' && document.carrier && (
                <div className="text-center mb-8">
                  <img 
                    src={carrierLogos[document.carrier as keyof typeof carrierLogos]}
                    alt={document.carrier}
                    className="h-12 mx-auto"
                  />
                </div>
              )}

              {/* Barcode */}
              <div className="text-center mb-8">
                <div className="text-xs text-gray-500">
                  {document.type === 'Label' ? 'Tracking Number' : 'Document Reference'}
                </div>
                <div className="font-mono text-xl font-bold">
                  {document.type === 'Label' ? document.trackingNumber : document.id}
                </div>
                <div className="mt-2 flex justify-center">
                  <Barcode 
                    value={document.type === 'Label' ? document.trackingNumber || document.id : document.id}
                    width={1.5}
                    height={50}
                    fontSize={12}
                  />
                </div>
              </div>

              {/* Document Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500">Document Type</h4>
                  <p className="font-medium">{document.type}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500">Order Reference</h4>
                  <p className="font-medium">#{document.orderId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Close Preview
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentViewer;
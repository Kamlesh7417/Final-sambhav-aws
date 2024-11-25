import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, AlertCircle, Truck, Package, MapPin } from 'lucide-react';

interface ShippingDetailsProps {
  selectedOption: any;
  orderDetails: any;
}

const ShippingDetails = ({ selectedOption, orderDetails }: ShippingDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Order ID</span>
              </div>
              <span className="font-medium">{orderDetails.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Origin</span>
              </div>
              <span className="font-medium">{orderDetails.origin}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Destination</span>
              </div>
              <span className="font-medium">{orderDetails.destination}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Selected Service</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Carrier</span>
              </div>
              <span className="font-medium">{selectedOption.carrier}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Service Type</span>
              </div>
              <span className="font-medium">{selectedOption.service}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">Transit Time</span>
              </div>
              <span className="font-medium">{selectedOption.days} days</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedOption.documentation.map((doc: string, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
            >
              <FileText className="h-5 w-5 text-primary-600" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-medium text-green-800">Environmental Impact</h4>
            <p className="text-green-600 mt-1">
              This route saves {selectedOption.co2} kg of CO₂ compared to alternative options.
              By choosing this service, you're contributing to sustainable logistics.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShippingDetails;
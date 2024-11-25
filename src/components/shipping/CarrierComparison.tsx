import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign, Truck } from 'lucide-react';

interface ComparisonData {
  carrier: string;
  logo: string;
  metrics: {
    reliability: number;
    avgDelay: number;
    costSaving: number;
    coverage: number;
  };
}

const CarrierComparison = ({ carriers }: { carriers: ComparisonData[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {carriers.map((carrier, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <img src={carrier.logo} alt={carrier.carrier} className="h-8 object-contain" />
            <h3 className="font-semibold text-gray-900">{carrier.carrier}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Reliability</span>
                </div>
                <span className="font-medium">{carrier.metrics.reliability}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 rounded-full h-2"
                  style={{ width: `${carrier.metrics.reliability}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Avg. Delay</span>
                </div>
                <span className="font-medium">{carrier.metrics.avgDelay} days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 rounded-full h-2"
                  style={{ width: `${100 - (carrier.metrics.avgDelay * 20)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Cost Saving</span>
                </div>
                <span className="font-medium">{carrier.metrics.costSaving}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${carrier.metrics.costSaving}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4" />
                  <span>Coverage</span>
                </div>
                <span className="font-medium">{carrier.metrics.coverage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 rounded-full h-2"
                  style={{ width: `${carrier.metrics.coverage}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CarrierComparison;
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileCheck, FileWarning, FileClock } from 'lucide-react';

const categories = [
  {
    id: 'bills',
    name: 'Bills & Invoices',
    icon: FileText,
    documents: ['Commercial Invoice', 'Proforma Invoice']
  },
  {
    id: 'customs',
    name: 'Certificate of Origin',
    icon: FileCheck,
    documents: ['Certificate of Origin', 'Export License']
  },
  {
    id: 'packing',
    name: 'Packing List',
    icon: FileWarning,
    documents: ['Packing List', 'Weight List']
  },
  {
    id: 'regulatory',
    name: 'Regulatory Compliance',
    icon: FileClock,
    documents: ['RCMC', 'IEC', 'AD Code']
  }
];

interface DocumentCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

const DocumentCategories: React.FC<DocumentCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory(category.id)}
          className={`p-4 rounded-lg text-left ${
            selectedCategory === category.id
              ? 'bg-primary-50 border-2 border-primary-500'
              : 'bg-white border-2 border-transparent hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <category.icon className={`h-6 w-6 ${
              selectedCategory === category.id ? 'text-primary-600' : 'text-gray-500'
            }`} />
            <h3 className="font-medium text-gray-900">{category.name}</h3>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {category.documents.length} document types
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default DocumentCategories;
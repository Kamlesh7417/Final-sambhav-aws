import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setFilters, setPage } from '../store/slices/documentSlice';
import DocumentGroup from '../components/documents/DocumentGroup';
import DocumentViewer from '../components/documents/DocumentViewer';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';

const Documents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents, loading, filters, pagination } = useSelector((state: RootState) => state.documents);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom' | null>(null);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  const handleFiltersChange = (newFilters: any) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
  };

  const clearFilters = () => {
    dispatch(setFilters({ search: '' }));
    setDateRange(null);
    setCustomDateRange({ start: null, end: null });
    dispatch(setPage(1));
  };

  const handleDocumentView = (doc: any) => {
    if (doc.orderId === 'ORD334256') {
      window.open('https://aws-exportedge-dev-order-processing-bucket.s3.us-east-1.amazonaws.com/orders_docs/ORD334256/ORD334256_invoice.pdf', '_blank');
    } else {
      setSelectedDocument(doc);
    }
  };

  const filteredDocuments = Object.values(documents).filter(doc => {
    let matches = true;

    if (filters.search) {
      matches = matches && (
        doc.orderId.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (dateRange || (customDateRange.start && customDateRange.end)) {
      const docDate = new Date(doc.date);
      const today = new Date();
      
      if (dateRange === 'today') {
        matches = matches && docDate.toDateString() === today.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        matches = matches && docDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        matches = matches && docDate >= monthAgo;
      } else if (customDateRange.start && customDateRange.end) {
        matches = matches && docDate >= customDateRange.start && docDate <= customDateRange.end;
      }
    }

    return matches;
  });

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.orderId]) {
      acc[doc.orderId] = [];
    }
    acc[doc.orderId].push(doc);
    return acc;
  }, {} as Record<string, typeof filteredDocuments>);

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedOrderIds = Object.keys(groupedDocuments).slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
      >
        Documents
      </motion.h1>

      <FilterBar
        orderId={filters.search}
        dateRange={dateRange}
        customDateRange={customDateRange}
        status={''}
        onOrderIdChange={(value) => handleFiltersChange({ search: value })}
        onDateRangeChange={setDateRange}
        onCustomDateChange={setCustomDateRange}
        onStatusChange={() => {}}
        onClearFilters={clearFilters}
        statuses={[]}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedOrderIds.map((orderId) => (
            <DocumentGroup
              key={orderId}
              orderId={orderId}
              documents={groupedDocuments[orderId]}
              onView={handleDocumentView}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalItems={Object.keys(groupedDocuments).length}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={(page) => dispatch(setPage(page))}
      />

      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default Documents;
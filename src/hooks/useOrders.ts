import { useState, useEffect, useCallback } from 'react';
import { Order, MOCK_ORDERS } from '../utils/mockData';

export const useOrders = () => {
  const [orders, setOrders] = useState<Record<string, Order>>(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(MOCK_ORDERS);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders: loadOrders
  };
};

export default useOrders;
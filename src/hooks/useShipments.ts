import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchShipments, setPage, setFilters } from '../store/slices/shipmentSlice';

export const useShipments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    shipments, 
    loading, 
    error,
    pagination,
    filters 
  } = useSelector((state: RootState) => state.shipments);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const handleSetPage = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSetFilters = (newFilters: { search: string }) => {
    dispatch(setFilters(newFilters));
  };

  return {
    shipments,
    loading,
    error,
    pagination,
    filters,
    setPage: handleSetPage,
    setFilters: handleSetFilters,
  };
};
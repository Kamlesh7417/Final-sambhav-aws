import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchDocuments, setPage, setFilters } from '../store/slices/documentSlice';

export const useDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    documents, 
    loading, 
    error,
    pagination,
    filters 
  } = useSelector((state: RootState) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleSetPage = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSetFilters = (newFilters: { search: string }) => {
    dispatch(setFilters(newFilters));
  };

  return {
    documents,
    loading,
    error,
    pagination,
    filters,
    setPage: handleSetPage,
    setFilters: handleSetFilters,
  };
};

export default useDocuments;
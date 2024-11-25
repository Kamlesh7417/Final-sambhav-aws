import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchAISuggestions } from '../store/slices/aiSlice';

export const useAI = (orderId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { suggestions, loading, error } = useSelector((state: RootState) => state.ai);

  useEffect(() => {
    if (orderId && !suggestions[orderId]) {
      dispatch(fetchAISuggestions(orderId));
    }
  }, [orderId, dispatch]);

  return {
    suggestions: suggestions[orderId],
    loading,
    error,
  };
};
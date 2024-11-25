import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import shipmentReducer from './slices/shipmentSlice';
import documentReducer from './slices/documentSlice';
import aiReducer from './slices/aiSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    shipments: shipmentReducer,
    documents: documentReducer,
    ai: aiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
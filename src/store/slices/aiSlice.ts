import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AISuggestion {
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  type: string;
  recommendedCarrier: string;
  recommendedService: string;
  estimatedCost: number;
  documents: string[];
}

interface AIState {
  suggestions: Record<string, AISuggestion>;
  loading: boolean;
  error: string | null;
}

const initialState: AIState = {
  suggestions: {},
  loading: false,
  error: null,
};

const mockSuggestions: Record<string, AISuggestion> = {
  'ORD001': {
    origin: 'Mumbai, India',
    destination: 'New York, USA',
    weight: '500',
    dimensions: '100x100x100',
    type: 'Electronics',
    recommendedCarrier: 'DHL',
    recommendedService: 'Air Freight',
    estimatedCost: 90000,
    documents: ['Commercial Invoice', 'Packing List', 'Bill of Lading'],
  },
  'ORD002': {
    origin: 'Delhi, India',
    destination: 'London, UK',
    weight: '750',
    dimensions: '120x120x120',
    type: 'Textiles',
    recommendedCarrier: 'Maersk',
    recommendedService: 'Sea Freight',
    estimatedCost: 65000,
    documents: ['Export Declaration', 'Certificate of Origin', 'Insurance Certificate'],
  },
};

export const fetchAISuggestions = createAsyncThunk(
  'ai/fetchSuggestions',
  async (orderId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockSuggestions[orderId]) {
      return { orderId, data: mockSuggestions[orderId] };
    }
    throw new Error('Order not found');
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAISuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAISuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions[action.payload.orderId] = action.payload.data;
      })
      .addCase(fetchAISuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch AI suggestions';
      });
  },
});

export const { clearSuggestions } = aiSlice.actions;
export default aiSlice.reducer;
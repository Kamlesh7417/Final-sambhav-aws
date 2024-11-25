import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Document, MOCK_DOCUMENTS } from '../../utils/mockData';

interface DocumentState {
  documents: Record<string, Document>;
  loading: boolean;
  error: string | null;
  selectedDocumentId: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  filters: {
    search: string;
  };
}

const initialState: DocumentState = {
  documents: MOCK_DOCUMENTS,
  loading: false,
  error: null,
  selectedDocumentId: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10
  },
  filters: {
    search: ''
  }
};

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_DOCUMENTS;
  }
);

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<{ search: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    addShippingLabel: (state, action: PayloadAction<Document>) => {
      state.documents[action.payload.id] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch documents';
      });
  }
});

export const { setPage, setFilters, addShippingLabel } = documentSlice.actions;
export default documentSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './features/Filter/FilterSlice';

export const store = configureStore({
  reducer: {
    filtersState: filtersReducer,
  },
});

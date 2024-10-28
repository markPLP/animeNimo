import { configureStore } from '@reduxjs/toolkit';
import typeHeadSearchReducer from './features/search/TypeHeadSearchSlice';

export const store = configureStore({
  reducer: {
    typeHeadSearch: typeHeadSearchReducer,
  },
});

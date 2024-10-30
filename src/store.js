import { configureStore } from '@reduxjs/toolkit';
import typeHeadSearchReducer from './features/search/TypeHeadSearchSlice';
import cardHoverReducer from './features/cardHover/CardHoverSlice';
export const store = configureStore({
  reducer: {
    typeHeadSearchState: typeHeadSearchReducer,
    cardHoverState: cardHoverReducer,
  },
});

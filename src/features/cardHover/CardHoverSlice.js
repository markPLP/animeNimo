import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hoveredCard: false,
  hoveredCardId: null,
};

const cardHoverSlice = createSlice({
  name: 'cardHover',
  initialState,
  reducers: {
    setCardHover: (state, action) => {
      state.hoveredCard = action.payload;
    },
    setCardHoveredId: (state, action) => {
      state.hoveredCardId = action.payload;
    },
  },
});

export const { setCardHover, setCardHoveredId } = cardHoverSlice.actions;
export default cardHoverSlice.reducer;

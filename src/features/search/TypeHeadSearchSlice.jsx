import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  //isLoading: true,
};

const typeHeadSearchSlice = createSlice({
  name: 'typeHeadSearch',
  initialState,
  showDropdown: false,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setShowDropdown: (state, action) => {
      state.showDropdown = action.payload;
    },
  },
});

export const { setQuery, setShowDropdown } = typeHeadSearchSlice.actions;
export default typeHeadSearchSlice.reducer;

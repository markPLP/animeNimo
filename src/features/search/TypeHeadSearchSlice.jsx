import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  //isLoading: true,
};

const typeHeadSearchSlice = createSlice({
  name: 'typeHeadSearch',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = typeHeadSearchSlice.actions;
export default typeHeadSearchSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGenres: [],
  orderBy: '',
  score: '',
  searchQuery: '',
  selectedYearStart: '',
  status: '',
  type: '',
};

const getFilterFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('filters')) || initialState;
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState: getFilterFromLocalStorage(),
  reducers: {
    setFilters(state, action) {
      console.log(state, 'setFilter STATE');
      console.log(action, 'setFilter ACTION');

      const { filteredData } = action.payload;
      console.log(filteredData, 'filteredDatafilteredDatafilteredData');

      const { genres, order_by, score, search, start_date, status, type } =
        filteredData;

      state.selectedGenres = genres || [];
      state.orderBy = order_by || '';
      state.score = score || 9;
      state.searchQuery = search || '';
      state.selectedYearStart = start_date || '';
      state.status = status || '';
      state.type = type || '';

      localStorage.setItem('filters', JSON.stringify(state));
      console.log('Updated State:', JSON.parse(JSON.stringify(state)));
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedGenres(state, action) {
      state.selectedGenres = action.payload;
    },
    setSelectedYearStart(state, action) {
      state.selectedYearStart = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload;
    },
    setScore(state, action) {
      state.score = action.payload;
    },
  },
});

export const {
  setFilters,
  setSearchQuery,
  setSelectedGenres,
  setSelectedYearStart,
  setType,
  setStatus,
  setOrderBy,
  setScore,
} = filtersSlice.actions;

export default filtersSlice.reducer;

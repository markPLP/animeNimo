import { createSelector, createSlice } from '@reduxjs/toolkit';

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
  name: 'filters',
  initialState: getFilterFromLocalStorage(),
  reducers: {
    setFilters(state, action) {
      const { filteredData } = action.payload;
      console.log(filteredData, 'filteredDatafilteredDatafilteredData');

      const { genres, order_by, score, search, start_date, status, type } =
        filteredData;

      state.selectedGenres = genres || [];
      state.orderBy = order_by || '';
      state.score = score || '';
      state.searchQuery = search || '';
      state.selectedYearStart = start_date || '';
      state.status = status || '';
      state.type = type || '';

      localStorage.setItem('filters', JSON.stringify(state));
    },
    setFilterReset(state) {
      localStorage.setItem('filters', JSON.stringify(initialState));
      return initialState;
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
  setFilterReset,
  setSearchQuery,
  setSelectedGenres,
  setSelectedYearStart,
  setType,
  setStatus,
  setOrderBy,
  setScore,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// // Selector to check if any state is populated
// export const isAnyStatePopulated = createSelector(
//   (state) => state.filtersState || {},
//   (filtersState) =>
//     Object.values(filtersState).some(
//       (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)) // ensures that non-empty strings, numbers, or truthy values are counted as "populated."
//     )
// );

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGenres: [],
  selectedYearStart: '',
  searchQuery: '',
  type: '',
  status: '',
  orderBy: '',
  score: '',
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
      const queryString = action.payload;
      const params = new URLSearchParams(queryString);
      let paramsObject = Object.fromEntries(params.entries());
      if (paramsObject.genres) {
        paramsObject.genres = paramsObject.genres.split(',');
      }

      localStorage.setItem('filters', JSON.stringify(paramsObject));

      console.log(paramsObject, 'queryParams = action.payload');

      return { ...state, ...paramsObject };
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

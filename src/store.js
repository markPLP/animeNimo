import { configureStore } from '@reduxjs/toolkit';
// import typeHeadSearchReducer from './features/search/TypeHeadSearchSlice';
import filtersReducer from './features/Filter/FilterSlice';
//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'; // default storage is localStorage

//import { createTransform } from 'redux-persist';

// Custom transform to ensure proper handling of serialized values
// const transform = createTransform(
//   (inboundState) => {
//     // Modify the incoming state if needed, here you can handle data transformations
//     return {
//       ...inboundState,
//       searchQuery: inboundState.searchQuery.trim() || '', // Example: trim the searchQuery
//       selectedGenres: Array.isArray(inboundState.selectedGenres)
//         ? inboundState.selectedGenres
//         : JSON.parse(inboundState.selectedGenres), // Ensure it's an array
//     };
//   },
//   (outboundState) => {
//     // Modify the outgoing state if needed (before saving to localStorage)
//     return {
//       ...outboundState,
//       searchQuery: outboundState.searchQuery || '',
//       selectedGenres: Array.isArray(outboundState.selectedGenres)
//         ? outboundState.selectedGenres
//         : JSON.stringify(outboundState.selectedGenres), // Ensure it's stringified
//     };
//   },
//   { whitelist: ['filtersState'] } // Only apply to the filtersState
// );

// const persistConfig = {
//   key: 'root', // the key to store the persisted state in localStorage
//   storage,
//   // transforms: [transform], // Apply the transformation here

//   // specify the storage engine (localStorage or sessionStorage)
//   // optional
//   // whitelist: ['auth'], // only persist the 'auth' slice of the state
//   // blacklist: ['someOtherSlice'], // optionally, exclude some reducers from being persisted
// };

//const persistedReducer = persistReducer(persistConfig, filtersReducer);

export const store = configureStore({
  reducer: {
    //typeHeadSearchState: typeHeadSearchReducer,
    filtersState: filtersReducer,
  },
});

//export const persistor = persistStore(store); // creates the persistor instance

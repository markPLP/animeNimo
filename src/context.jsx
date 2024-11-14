import { createContext, useContext, useEffect, useState } from 'react';
import { useGetAllAnimeGenres } from './utils/reactQueryCustomHooks';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  //const { allGenreData } = useGetAllAnimeGenres();

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

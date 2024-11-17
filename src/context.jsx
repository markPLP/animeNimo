import { createContext, useContext } from 'react';
import { useFetchAnimeGenres } from './hooks/useFetchAnimeGenres';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { allGenreData } = useFetchAnimeGenres();

  return (
    <AppContext.Provider value={{ allGenreData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

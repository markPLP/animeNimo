import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';

// export const allEpisodesQuery = (mal_id) => ({
//   queryKey: ['episodes', mal_id],
//   queryFn: async () => {
//     const response = await customFetch.get(`anime/${mal_id}/episodes`);

//     const data = response.data.data;
//     const pagination = response.data.pagination;

//     return { data, pagination };
//   },
// });

// export const useFetchEpisodes = (mal_id) => {
//   const { data, isLoading, isError } = useQuery(allEpisodesQuery(mal_id));
//   return { data, isLoading, isError };
// };

// export const allEpisodesQuery = (mal_id, page = 1) => ({
//   queryKey: ['allEpisodes', mal_id, page],
//   queryFn: async () => {
//     const response = await fetch(
//       `https://api.jikan.moe/v4/anime/${mal_id}/episodes?page=${page}`
//     );
//     const result = await response.json();
//     return result;
//   },
// });

// export const fetchEpisodesQuery = async ({ queryKey }) => {
//   const [, mal_id, currentPage] = queryKey;
//   const response = await customFetch.get(
//     `/anime/${mal_id}/episodes?page=${currentPage}`
//   );

//     const data = response.data.data;
//     const pagination = response.data.pagination;

//   return { data, pagination }; // Return only the necessary data
// };

// export const singleWatchQuery = (mal_id) => {
//   return {
//     queryKey: ['singleWatchAnime', mal_id],
//     queryFn: () => {
//       return customFetch.get(`/anime/${mal_id}/episodes`);
//     },
//   };
// };

export const fetchEpisodes = async (mal_id, currentPage) => {
  const response = await customFetch.get(
    `/anime/${mal_id}/episodes?page=${currentPage}`
  );

  const data = response.data.data;
  const pagination = response.data.pagination;

  return { data, pagination };
};

export const useFetchEpisodes = (mal_id, currentPage) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['episodes', mal_id, currentPage],
    queryFn: () => fetchEpisodes(mal_id, currentPage), // Use the standalone fetch function
    keepPreviousData: true, // Retain previous data during fetching
  });

  const episodes = data?.data || [];
  const pagination = data?.pagination || {};
  return { episodes, pagination, isLoading, isError, error };
};

export const fetchSingleEpisodes = async (mal_id, episodeById) => {
  const response = await customFetch.get(
    `/anime/${mal_id}/episodes/${episodeById}`
  );

  const data = response.data.data;
  console.log(data, 'from response fetch single ep');

  return { data };
};

export const useFetchSingleEpisodes = (mal_id, episodeById) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['episodesbyId', mal_id, episodeById],
    queryFn: () => fetchSingleEpisodes(mal_id, episodeById), // Use the standalone fetch function
    keepPreviousData: true, // Retain previous data during fetching
  });

  const episode = data?.data || [];
  console.log(episode, 'from episodesbyId');

  return { episode, isLoading, isError, error };
};

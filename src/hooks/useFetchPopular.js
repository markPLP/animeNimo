import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';
import { filterItems } from '.';

export const popularAnimeQuery = {
  queryKey: ['popularAnime'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('/watch/episodes/popular');
      const data = response.data.data;

      return filterItems(data, 15);
    } catch (error) {
      console.error('Error fetching popular anime data:', error);
      throw new Response('Failed to load popular anime data', {
        status: 500,
      });
    }
  },
};

export const useFetchPopularAnime = () => {
  const { data, isLoading, isError } = useQuery(popularAnimeQuery);
  return { data, isLoading, isError };
};

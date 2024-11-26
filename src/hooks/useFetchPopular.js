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
  retry: (failureCount, error) => {
    // Retry up to 3 times for 404 or 429 errors
    if (error?.message.includes('404') || error?.message.includes('429')) {
      return failureCount < 3;
    }
    return false; // Do not retry for other errors
  },
};

export const useFetchPopularAnime = () => {
  const { data, isLoading, isError } = useQuery({
    ...popularAnimeQuery,
    retry: popularAnimeQuery.retry,
  });
  return { data, isLoading, isError };
};

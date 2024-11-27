import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';
import { filterItems } from '.';

export const recentlyAddedQuery = {
  queryKey: ['recentlyAdded'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('/watch/episodes');
      const data = response.data.data;

      return filterItems(data);
    } catch (error) {
      console.error('Error fetching recently added anime:', error);
      throw new Response('Failed to load recently added anime', {
        status: 500,
      });
    }
  },
  retry: (failureCount, error) => {
    // Retry up to 3 times for 404 or 429 errors
    const status = error?.message?.split(':')[0]; // Extract status from error message
    if (status === '404' || status === '429') {
      return failureCount < 3;
    }
    return false; // Do not retry for other errors
  },
};

export const useFetchRecentlyAdded = () => {
  const { data, isLoading, isError } = useQuery({
    ...recentlyAddedQuery,
    retry: recentlyAddedQuery.retry,
  });
  return { data, isLoading, isError };
};

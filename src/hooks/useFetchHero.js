import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';

export const heroQuery = {
  queryKey: ['heroBanner'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('top/anime');
      const data = response.data.data;

      return data.slice(0, 10);
    } catch (error) {
      if (error?.response?.status === 404 || error?.response?.status === 429) {
        console.warn(`Error ${error.response.status}: Retrying...`);
        throw new Error(`${error.response.status}: Retrying...`);
      }
      console.error('Error fetching hero banner data:', error);
      throw new Response('Failed to load hero banner data', {
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

export const useFetchHero = () => {
  const { data, isLoading, isError } = useQuery({
    ...heroQuery,
    retry: heroQuery.retry, // Apply the retry logic
  });

  return { data, isLoading, isError };
};

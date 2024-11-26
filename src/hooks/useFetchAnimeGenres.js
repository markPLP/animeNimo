import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';

export const useFetchAnimeGenres = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['getAllGenres'],
    queryFn: async () => {
      try {
        const response = await customFetch.get('/genres/anime');

        return response.data.data;
      } catch (error) {
        const status = error?.response?.status;

        if (status === 404 || status === 429) {
          console.warn(`Error ${status}: Retrying...`);
          throw new Error(`${status}: Retrying...`);
        }

        console.error('Error fetching genres data:', error);
        throw new Response('Failed to load genres data', { status: 500 });
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
  });

  const uniqueData = data
    ? Array.from(new Map(data.map((item) => [item.mal_id, item])).values())
    : [];

  return { isLoading, allGenreData: uniqueData, isError };
};

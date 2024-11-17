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
        console.error('Error fetching genres data:', error);
        throw new Response('Failed to load genres data', { status: 500 });
      }
    },
  });

  return { isLoading, allGenreData: data, isError };
};

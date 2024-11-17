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
      console.error('Error fetching hero banner data:', error);
      throw new Response('Failed to load hero banner data', {
        status: 500,
      });
    }
  },
};

export const useFetchHero = () => {
  const { data, isLoading, isError } = useQuery(heroQuery);
  return { data, isLoading, isError };
};

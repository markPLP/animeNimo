import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';
import { filterItems } from '.';

export const recentlyAddedQuery = {
  queryKey: ['recentlyAdded'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('/watch/episodes');
      const data = response.data.data;

      // console.log(data, 'datadatadata');
      return filterItems(data);
    } catch (error) {
      console.error('Error fetching recently added anime:', error);
      throw new Response('Failed to load recently added anime', {
        status: 500,
      });
    }
  },
};

export const useFetchRecentlyAdded = () => {
  const { data, isLoading, isError } = useQuery(recentlyAddedQuery);
  return { data, isLoading, isError };
};

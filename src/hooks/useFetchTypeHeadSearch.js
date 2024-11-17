import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '.';
import { customFetch } from '../utils';

export const useFetchTypeHeadSearch = (input) => {
  const query = useDebounce(input, 500); // Debounced query to avoild frequent request, 500ms

  const { isLoading, data, isError } = useQuery({
    queryKey: ['suggestions', query], // Cache with first 3 letters only
    queryFn: async () => {
      try {
        const response = await customFetch.get(
          `/anime?q=${query}&limit=5&order_by=popularity`
        );

        return response?.data?.data || [];
      } catch (error) {
        console.error('Error fetching searched anime:', error);
        throw new Response('Failed to load searched anime', { status: 500 });
      }
    },
    enabled: query.length > 1, // Only fetch if 2+ characters
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return { isLoading, suggestions: data || [], isError };
};

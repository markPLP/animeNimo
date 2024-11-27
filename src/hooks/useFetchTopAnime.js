import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';

export const topAnimeQuery = (filter) => ({
  queryKey: ['topAnime', filter], // Ensure queryKey is an array
  queryFn: async () => {
    try {
      const response = await customFetch.get(`/top/anime?filter=${filter}`);

      const data = response.data.data;
      // Filter out duplicate `mal_id` entries
      const uniqueData = data
        ? Array.from(new Map(data.map((item) => [item.mal_id, item])).values())
        : [];
      data;

      return uniqueData.slice(0, 10); // Return the data directly
    } catch (error) {
      console.error('Error fetching top anime filter anime:', error);
      throw new Response('Failed to load top anime filter anime', {
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
});

export const useFetchTopAnime = (filter) => {
  const { data, isLoading, isError } = useQuery({
    ...topAnimeQuery(filter),
    retry: topAnimeQuery(filter).retry,
  });

  return { data, isLoading, isError };
};

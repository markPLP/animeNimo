import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../utils';

const fullAnimeQuery = (mal_id) => ({
  queryKey: ['hoverElement', mal_id],
  queryFn: async () => {
    const response = await customFetch.get(`/anime/${mal_id}/full`);

    return response.data.data;
  },
  enabled: !!mal_id, // Only fetch when mal_id is defined
  retry: (failureCount, error) => {
    // Retry up to 3 times for 404 or 429 errors
    const status = error?.message?.split(':')[0]; // Extract status from error message
    if (status === '404' || status === '429') {
      return failureCount < 3;
    }
    return false; // Do not retry for other errors
  },
});

export const useFetchFullAnime = (mal_id) => {
  const { isLoading, data, isError } = useQuery({
    ...fullAnimeQuery(mal_id),
    retry: fullAnimeQuery(mal_id).retry,
  });
  return { isLoading, data, isError };
};

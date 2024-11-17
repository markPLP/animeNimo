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
    // Retry up to 3 times only if the error status is 429
    if (error.response && error.response.status === 429 && failureCount <= 3) {
      return true;
    }
    return false;
  },
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
});

export const useFetchFullAnime = (mal_id) => {
  const { isLoading, data, isError } = useQuery(fullAnimeQuery(mal_id));
  return { isLoading, data, isError };
};

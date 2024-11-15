import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { customFetch } from '.';

// Debounce hook
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// custom fetch function
const useCustomFetch = (queryKey, endpoint, options = {}) => {
  const { filter = true, limit = 10 } = options; // Default to filtering and limiting to 10

  const { isLoading, data, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await customFetch.get(endpoint);
        const items = response.data.data;
        // Optionally filter data (exclude region_locked items)
        const filteredItems = filter
          ? items.filter((item) => item.region_locked !== true)
          : items;
        // Optionally limit results
        return limit ? filteredItems.slice(0, limit) : filteredItems;
      } catch (error) {
        console.log('Error Fetching data', error);
        throw error;
      }
    },
  });

  return { isLoading, data: data || [], isError };
};

export const useGetFullAnimeQuery = (mal_id) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['hoverElement', mal_id],
    queryFn: async () => {
      const response = await customFetch.get(`/anime/${mal_id}/full`);

      return response.data.data;
    },
    enabled: !!mal_id, // Only fetch when mal_id is defined
    retry: (failureCount, error) => {
      // Retry up to 3 times only if the error status is 429
      if (
        error.response &&
        error.response.status === 429 &&
        failureCount <= 3
      ) {
        return true;
      }
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
  });
  return { isLoading, data, isError };
};

export const useGetAllAnimeGenres = () => {
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

export const useGetTopAnimeQuery = (topAnimeFilter) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['topAnime', topAnimeFilter],
    queryFn: async () => {
      try {
        const topAnimeResponse = await customFetch.get(
          `/top/anime?filter=${topAnimeFilter}`
        );
        return topAnimeResponse.data.data;
      } catch (error) {
        console.error('Error fetching top anime filter:', error);
        throw new Response('Failed to load top anime filter:TopAnime', {
          status: 500,
        });
      }
    },
  });
  // Filter out duplicate mal_id
  const uniqueData = data
    ? Array.from(new Map(data.map((item) => [item.mal_id, item])).values())
    : [];

  return { isLoading, data: uniqueData.slice(0, 10), isError };
};

export const useFetchRecentlyAdded = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['recentlyAdded'],
    queryFn: async () => {
      try {
        const recentlyAddedResponse = await customFetch.get('/watch/episodes');
        return recentlyAddedResponse.data.data;
      } catch (error) {
        console.error('Error fetching recently added anime:', error);
        throw new Response('Failed to load recently added anime', {
          status: 500,
        });
      }
    },
  });

  const filterRegionLock = data
    ? data.filter((item) => item.region_locked !== true)
    : [];

  return { isLoading, data: filterRegionLock, isError };
};

export const useGetTypeSearchData = (input) => {
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
  //console.log(data, 'searchedAnime');

  return { isLoading, suggestions: data || [], isError };
};

// export const useHeroBannerFetch = () => {
//   const { isLoading, data, isError } = useQuery({
//     queryKey: ['heroBanner'],
//     queryFn: async () => {
//       const response = await customFetch.get('/top/anime');
//       const items = response.data.data;
//       const filterItems = items
//         .filter((item) => item.region_locked !== true)
//         .slice(0, 10);
//       //  const filterItems = items.slice(0, 10);

//       return filterItems;
//     },
//   });
//   return { isLoading, filterItems: data || [], isError };
// };

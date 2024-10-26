import { useQuery } from '@tanstack/react-query';
import { customFetch } from '.';

export const useCustomFetch = (queryKey, endpoint, options = {}) => {
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

// fetch banner
export const useHeroBannerFetchQuery = () => {
  return useCustomFetch('heroBanner', 'top/anime', { filter: true, limit: 10 });
};

// fetch popular anime
export const usePopularAnimeQuery = () => {
  return useCustomFetch('popularAnime', '/watch/episodes/popular', {
    filter: true,
    limit: 15,
  });
};

export const useGridHoverElementsQuery = (mal_id) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['hoverElement', mal_id],
    queryFn: async () => {
      const response = await customFetch.get(`/anime/${mal_id}/full`);

      return response.data.data;
    },
    enabled: !!mal_id, // Only fetch when mal_id is defined
  });
  return { isLoading, data, isError };
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

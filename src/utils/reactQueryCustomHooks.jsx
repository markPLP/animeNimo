import { useQuery } from '@tanstack/react-query';
import { customFetch } from '.';

export const useCustomFetch = (queryKey, endpoint, options = {}) => {
  const { filter = true, limit = 10 } = options; // Default to filtering and limiting to 10

  const { isLoading, data, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await customFetch.get(endpoint);
      const items = response.data.data;

      // Optionally filter data (exclude region_locked items)
      const filteredItems = filter
        ? items.filter((item) => item.region_locked !== true)
        : items;

      // Optionally limit results
      return limit ? filteredItems.slice(0, limit) : filteredItems;
    },
  });

  return { isLoading, data: data || [], isError };
};

export const useHeroBannerFetch = () =>
  useCustomFetch('heroBanner', 'top/anime', { filter: true, limit: 10 });

export const usePopularAnime = () =>
  useCustomFetch('popularAnime', '/watch/episodes/popular', {
    filter: true,
    limit: 10,
  });

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

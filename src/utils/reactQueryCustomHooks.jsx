import { useQuery } from '@tanstack/react-query';
import { customFetch } from '.';

export const useHeroBannerFetch = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['heroBanner'],
    queryFn: async () => {
      // return only the data 'items'
      // exclude pagination
      const response = await customFetch.get('/top/anime');
      const items = response.data.data;

      // // filter data, dont include region_locked === true
      // // display only 10 items
      // const filterItems = items
      //   .filter((item) => item.region_locked !== true)
      //   .slice(0, 10);

      const filterItems = items.slice(0, 10);

      return filterItems;
    },
  });

  // console.log(data, 'should be item');
  // return items or empty array is null
  return { isLoading, filterItems: data || [], isError };
};

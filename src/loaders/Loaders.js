import { customFetch } from '../utils';

const createQuery = (key, url) => ({
  queryKey: key,
  queryFn: () => customFetch.get(url),
});

// OPTIONAL: Utility function to filter items
const filterItems = (items, limit) =>
  items.filter((item) => !item.region_locked).slice(0, limit);

// Fetch queries
const getHeroBannerQuery = createQuery(['heroBanner'], 'top/anime');
const getPopularAnimeQuery = createQuery(
  ['popularAnime'],
  '/watch/episodes/popular'
);

export const heroBannerLoader = async (queryClient) => {
  try {
    const heroResponse = await queryClient.ensureQueryData(getHeroBannerQuery);

    return filterItems(heroResponse.data.data, 10);
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    throw new Response('Failed to load hero banner data', { status: 500 });
  }
};

export const popularAnimeLoader = async (queryClient) => {
  try {
    const popularAnimeResponse = await queryClient.ensureQueryData(
      getPopularAnimeQuery
    );

    return filterItems(popularAnimeResponse.data.data, 15);
  } catch (error) {
    console.error('Error fetching popular anime data:', error);
    throw new Response('Failed to load popular anime data', { status: 500 });
  }
};

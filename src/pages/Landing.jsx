import { useLoaderData } from 'react-router-dom';
import { Hero, GridAnime, SectionTitle, Loading } from '../components';

import { customFetch } from '../utils';

// Utility function to create a query configuration
const createQuery = (key, url) => ({
  queryKey: key,
  queryFn: () => customFetch.get(url),
});

// Fetch queries
const getHeroBannerQuery = createQuery(['heroBanner'], 'top/anime');
const getPopularAnimeQuery = createQuery(
  ['popularAnime'],
  '/watch/episodes/popular'
);

// Utility function to filter items
const filterItems = (items, limit) =>
  items.filter((item) => !item.region_locked).slice(0, limit);

export const loader = (queryClient) => async () => {
  try {
    const [heroResponse, popularResponse] = await Promise.all([
      queryClient.ensureQueryData(getHeroBannerQuery),
      queryClient.ensureQueryData(getPopularAnimeQuery),
    ]);

    const heroBanner = filterItems(heroResponse.data.data, 10);
    const popularAnime = filterItems(popularResponse.data.data, 15);

    return { heroBanner, popularAnime };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Response('Failed to load data', { status: 500 });
  }
};

const Landing = () => {
  // // Parallel request / mutiple API resquest
  // const {
  //   isLoading: isLoadingPopularAnime,
  //   data: popularAnime,
  //   isError: isErrorPopularAnime,
  // } = usePopularAnimeQuery();

  // const {
  //   isLoading: isLoadingHero,
  //   data: heroData,
  //   isError: isErrorHero,
  // } = useHeroBannerFetchQuery();

  // if (isLoadingPopularAnime || isLoadingHero) return <Loading />;
  // if (isErrorPopularAnime || isErrorHero)
  //   return <div>There was an error...</div>;
  ///// =================
  const { heroBanner, popularAnime } = useLoaderData();

  return (
    <>
      <Hero data={heroBanner} />
      <SectionTitle title="Popular now" />
      <GridAnime data={popularAnime} />
    </>
  );
};

export default Landing;

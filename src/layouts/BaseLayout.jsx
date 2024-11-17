import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';
import { memo } from 'react';
import { recentlyAddedQuery } from '../hooks/useFetchRecentlyAdded';
import { heroQuery } from '../hooks/useFetchHero';
import { popularAnimeQuery } from '../hooks/useFetchPopular';
import { topAnimeQuery } from '../hooks/useFetchTopAnime';

export const loader = (queryClient) => async () => {
  try {
    const [heroBanner, popularAnime, recentAddedAnime, topAnime] =
      await Promise.all([
        queryClient.ensureQueryData(heroQuery),
        queryClient.ensureQueryData(popularAnimeQuery),
        queryClient.ensureQueryData(recentlyAddedQuery),
        queryClient.ensureQueryData(topAnimeQuery('airing')),
      ]);

    console.log(topAnime, 'recentAddedAnime from loader');

    return {
      heroBanner: heroBanner || [],
      popularAnime: popularAnime || [],
      recentAddedAnime: recentAddedAnime || [],
      topAnime: topAnime || [],
    };
  } catch (error) {
    console.error('Error in loader:', error);
    throw new Response('Failed to fetch data for the page', { status: 500 });
  }
};

const BaseLayout = () => {
  const navigation = useNavigation();
  // grab loaderData/useLoaderData and pass as prop
  const loaderData = useLoaderData();
  const isPageLoading = navigation.state === 'loading';
  console.log(loaderData, 'loaderData in BaseLayout');
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <main>
          <Outlet context={loaderData} />
        </main>
      )}
    </>
  );
};

export default memo(BaseLayout);

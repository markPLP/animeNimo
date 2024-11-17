import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';
import { memo } from 'react';
import { recentlyAddedQuery } from '../hooks/useFetchRecentlyAdded';
import { heroQuery } from '../hooks/useFetchHero';
import { popularAnimeQuery } from '../hooks/useFetchPopular';
import { topAnimeQuery } from '../hooks/useFetchTopAnime';
import {
  randomUserQuery,
  userFullDetailsQuery,
} from '../components/userAnime/useFetchRandomUser';
import Footer from './Footer';

export const loader = (queryClient) => async () => {
  try {
    const [heroBanner, popularAnime, recentAddedAnime, topAnime, randomUser] =
      await Promise.all([
        queryClient.ensureQueryData(heroQuery),
        queryClient.ensureQueryData(popularAnimeQuery),
        queryClient.ensureQueryData(recentlyAddedQuery),
        queryClient.ensureQueryData(topAnimeQuery('airing')),
        queryClient.ensureQueryData(randomUserQuery),
      ]);

    let userFullDetails = null;
    if (randomUser) {
      userFullDetails = await queryClient.ensureQueryData(
        userFullDetailsQuery(randomUser)
      );
    }

    console.log(userFullDetails, 'from userFullDetails loader');

    return {
      heroBanner: heroBanner || [],
      popularAnime: popularAnime || [],
      recentAddedAnime: recentAddedAnime || [],
      topAnime: topAnime || [],
      randomUser,
      userFullDetails,
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
      <Footer />
    </>
  );
};

export default memo(BaseLayout);

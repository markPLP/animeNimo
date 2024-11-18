import { useLoaderData } from 'react-router-dom';
import {
  Filters,
  GridAnime,
  Hero,
  RandomUserWidget,
  SectionTitle,
  SidebarRecentlyAdded,
  SidebarTopAnime,
} from '../components';
import { recentlyAddedQuery } from '../hooks/useFetchRecentlyAdded';
import { heroQuery } from '../hooks/useFetchHero';
import { popularAnimeQuery } from '../hooks/useFetchPopular';
//import { topAnimeQuery } from '../hooks/useFetchTopAnime';
import {
  randomUserQuery,
  userFullDetailsQuery,
} from '../components/userAnime/useFetchRandomUser';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { memo } from 'react';
import { useGlobalContext } from '../context';

export const loader = (queryClient) => async () => {
  try {
    const [heroBanner, popularAnime, recentAddedAnime, randomUser] =
      await Promise.all([
        queryClient.ensureQueryData(heroQuery),
        queryClient.ensureQueryData(popularAnimeQuery),
        queryClient.ensureQueryData(recentlyAddedQuery),
        queryClient.ensureQueryData(randomUserQuery),
        //queryClient.ensureQueryData(topAnimeQuery('airing')),
      ]);
    //topAnime

    let userFullDetails = null;
    if (randomUser) {
      userFullDetails = await queryClient.ensureQueryData(
        userFullDetailsQuery(randomUser)
      );
    }

    return {
      heroBanner: heroBanner || [],
      popularAnime: popularAnime || [],
      recentAddedAnime: recentAddedAnime || [],
      randomUser,
      userFullDetails,
      // topAnime: topAnime || [],
    };
  } catch (error) {
    console.error('Error in loader:', error);
    throw new Response('Failed to fetch data for the page', { status: 500 });
  }
};

const Landing = () => {
  const { allGenreData } = useGlobalContext();
  const {
    heroBanner,
    popularAnime,
    recentAddedAnime,
    topAnime,
    userFullDetails,
  } = useLoaderData();

  return (
    <section className="align-element py-10 lg:flex gap-8">
      <section className="md:w-full lg:w-[69%] flex-grow">
        <Hero data={heroBanner} />
        <SectionTitle title="Popular now" />
        <GridAnime data={popularAnime} />
        <SidebarRecentlyAdded
          headingTitle="Recently Added"
          loaderData={recentAddedAnime}
        />
      </section>
      <aside className="lg:w-[380px]">
        <Filters resetLink="/" allGenres={allGenreData} />
        <SidebarTopAnime loaderData={topAnime} />
        <RandomUserWidget loaderData={userFullDetails} />
      </aside>
    </section>
  );
};

export default memo(Landing);

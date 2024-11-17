import { useOutletContext } from 'react-router-dom';
import {
  Filters,
  GridAnime,
  Hero,
  SectionTitle,
  SidebarRecentlyAdded,
  SidebarTopAnime,
} from '../components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { memo, useContext } from 'react';
import { useGlobalContext } from '../context';

const Landing = () => {
  const { allGenreData } = useGlobalContext();
  const { heroBanner, popularAnime, recentAddedAnime, topAnime } =
    useOutletContext();

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
      </aside>
    </section>
  );
};

export default memo(Landing);

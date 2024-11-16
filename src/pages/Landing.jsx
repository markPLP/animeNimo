import { useOutletContext } from 'react-router-dom';
import {
  Hero,
  GridAnime,
  SectionTitle,
  Filters,
  SidebarTopAnime,
  SidebarRecentlyAdded,
} from '../components';
import { useGlobalContext } from '../context';
import { memo } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Landing = () => {
  // useOutletContext - props from <Outlet />
  const { popularAnime, heroBanner } = useOutletContext();
  const { allGenreData } = useGlobalContext();

  return (
    <section className="align-element py-10 lg:flex gap-8">
      <section className="md:w-full lg:w-[69%] flex-grow">
        <Hero data={heroBanner} />
        <SectionTitle title="Popular now" />
        <GridAnime data={popularAnime} />
        <SidebarRecentlyAdded headingTitle="Recently Added" />
      </section>
      <aside className="lg:w-[380px]">
        <Filters resetLink="/" allGenres={allGenreData} />
        <SidebarTopAnime sidebarHeading="Top Anime" />
      </aside>
    </section>
  );
};

export default memo(Landing);

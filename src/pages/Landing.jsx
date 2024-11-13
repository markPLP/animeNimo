import { useOutletContext } from 'react-router-dom';
import {
  Hero,
  GridAnime,
  SectionTitle,
  Filters,
  TopAnime,
} from '../components';
import { useGlobalContext } from '../context';

const Landing = () => {
  // useOutletContext - props from <Outlet />
  const randomText = ['x', 'y', 'z'];
  const randomIndex = Math.floor(Math.random() * randomText.length);
  const text = randomText[randomIndex];

  const { heroBanner, popularAnime } = useOutletContext();
  const { allGenreData } = useGlobalContext();

  return (
    <section className="align-element py-10 lg:flex gap-8">
      <section className="md:w-full lg:w-[69%] flex-grow">
        <h1>{text}</h1>
        <Hero data={heroBanner} />
        <SectionTitle title="Popular now" />
        <GridAnime data={popularAnime} />
      </section>
      <aside className="lg:w-[380px]">
        <Filters resetLink="/" allGenres={allGenreData} />
        <TopAnime />
      </aside>
    </section>
  );
};

export default Landing;

import { Hero, GridAnime, SectionTitle } from '../components';
import { usePopularAnimeQuery } from '../utils/reactQueryCustomHooks';

const Landing = () => {
  return (
    <>
      <Hero />
      <SectionTitle title="Popular now" />
      <GridAnime custom_hook={usePopularAnimeQuery} />
    </>
  );
};

export default Landing;

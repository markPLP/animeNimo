import { useOutletContext } from 'react-router-dom';
import { Hero, GridAnime, SectionTitle } from '../components';

const Landing = () => {
  // useOutletContext - props from <Outlet />
  const { heroBanner, popularAnime } = useOutletContext();

  return (
    <>
      <Hero data={heroBanner} />
      <SectionTitle title="Popular now" />
      <GridAnime data={popularAnime} />
    </>
  );
};

export default Landing;

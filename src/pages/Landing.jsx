import { useLoaderData } from 'react-router-dom';
import { Hero, GridAnime, SectionTitle, Loading } from '../components';
import { heroBannerLoader, popularAnimeLoader } from '../loaders/Loaders';

// loader function
export const loader = (queryClient) => async () => {
  //   const heroBanner = await heroBannerLoader(queryClient);
  // const popularAnime = await popularAnimeLoader(queryClient);
  // Parallel Execution using Promise.all for better perfomance

  const [heroBanner, popularAnime] = await Promise.all([
    heroBannerLoader(queryClient),
    popularAnimeLoader(queryClient),
  ]);

  return { heroBanner, popularAnime };
};

const Landing = () => {
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

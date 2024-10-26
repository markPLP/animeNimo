import { Hero, GridAnime, SectionTitle, Loading } from '../components';
import {
  useHeroBannerFetchQuery,
  usePopularAnimeQuery,
} from '../utils/reactQueryCustomHooks';

const Landing = () => {
  // Parallel request / mutiple resquest
  const {
    isLoading: isLoadingPopularAnime,
    data: popularAnime,
    isError: isErrorPopularAnime,
  } = usePopularAnimeQuery();
  console.log(popularAnime);
  const {
    isLoading: isLoadingHero,
    data: heroData,
    isError: isErrorHero,
  } = useHeroBannerFetchQuery();

  if (isLoadingPopularAnime || isLoadingHero) return <Loading />;
  if (isErrorPopularAnime || isErrorHero)
    return <div>There was an error...</div>;
  return (
    <>
      <Hero data={heroData} />
      <SectionTitle title="Popular now" />
      <GridAnime data={popularAnime} />
    </>
  );
};

export default Landing;

import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';
import {
  heroBannerLoader,
  popularAnimeLoader,
  topAnimeLoader,
} from '../loaders/Loaders';
import { memo } from 'react';

export const loader = (queryClient) => async () => {
  // Parallel Execution using Promise.all for better perfomance
  const [heroBanner, popularAnime, topAnime] = await Promise.all([
    heroBannerLoader(queryClient),
    popularAnimeLoader(queryClient),
    topAnimeLoader(queryClient),
  ]);

  return { heroBanner, popularAnime, topAnime };
};

const BaseLayout = () => {
  const navigation = useNavigation();
  // grab loaderData/useLoaderData and pass as prop
  const loaderData = useLoaderData();
  const isPageLoading = navigation.state === 'loading';

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

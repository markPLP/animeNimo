import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Filters, Loading, Navbar } from '../components';
import {
  allGenresLoader,
  heroBannerLoader,
  popularAnimeLoader,
  //  searchAnimeLoader,
} from '../loaders/Loaders';

export const loader = (queryClient) => async () => {
  //   const heroBanner = await heroBannerLoader(queryClient);
  // const popularAnime = await popularAnimeLoader(queryClient);
  // Parallel Execution using Promise.all for better perfomance
  const [heroBanner, popularAnime, allGenres] = await Promise.all([
    heroBannerLoader(queryClient),
    popularAnimeLoader(queryClient),
    allGenresLoader(queryClient),
    // searchAnimeLoader(queryClient, { request }),
  ]);

  return { heroBanner, popularAnime, allGenres };
};

const HomeLayout = () => {
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
          <section className="align-element py-10 lg:flex gap-8">
            <section className="md:w-full lg:w-[69%] flex-grow">
              {/* Pass data as context or props here 'loaderData' */}
              <Outlet context={loaderData} />
            </section>
            <aside className="lg:w-[380px]">
              <Filters />
            </aside>
          </section>
        </main>
      )}
    </>
  );
};

export default HomeLayout;

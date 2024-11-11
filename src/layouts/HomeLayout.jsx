import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Filters, Loading, Navbar } from '../components';
import {
  //allGenresLoader,
  heroBannerLoader,
  popularAnimeLoader,
} from '../loaders/Loaders';
import { useGlobalContext } from '../context';

export const loader = (queryClient) => async () => {
  // Parallel Execution using Promise.all for better perfomance
  // allGenres
  const [heroBanner, popularAnime] = await Promise.all([
    heroBannerLoader(queryClient),
    popularAnimeLoader(queryClient),
    // allGenresLoader(queryClient),
  ]);

  return { heroBanner, popularAnime }; //allGenres
};

const HomeLayout = () => {
  const navigation = useNavigation();
  // grab loaderData/useLoaderData and pass as prop
  const loaderData = useLoaderData();
  const { allGenresData } = useGlobalContext();
  // const { allGenres } = useLoaderData();
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
              <Filters resetLink="/" allGenres={allGenresData} />
            </aside>
          </section>
        </main>
      )}
    </>
  );
};

export default HomeLayout;

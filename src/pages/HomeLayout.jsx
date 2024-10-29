import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';
import { heroBannerLoader, popularAnimeLoader } from '../loaders/Loaders';

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

const HomeLayout = () => {
  const navigation = useNavigation();
  // grab useLoaderData and pass as prop
  const loaderData = useLoaderData();

  // Rest of HomeLayout component...
  // const [isInitialLoading, setIsInitialLoading] = useState(true);
  // useEffect(() => {
  //   // Simulate initial loading state for a few seconds on page load
  //   const timer = setTimeout(() => setIsInitialLoading(false), 2000); // 2-second delay
  //   return () => clearTimeout(timer);
  // }, []);

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
              sidebarsidebarsidebarsidebarsidebar
            </aside>
          </section>
        </main>
      )}
    </>
  );
};

export default HomeLayout;

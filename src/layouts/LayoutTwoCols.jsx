import { Outlet, useNavigation } from 'react-router-dom';
import { Filters, Loading, SidebarTopAnime } from '../components';
import { useGlobalContext } from '../context';

const LayoutTwoCols = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const { allGenreData } = useGlobalContext();

  return (
    <>
      {isPageLoading ? (
        <Loading />
      ) : (
        <main>
          <section className="align-element py-10 lg:flex gap-8">
            <section className="md:w-full lg:w-[69%] flex-grow">
              <Filters resetLink="/search-results" allGenres={allGenreData} />
              <Outlet />
            </section>
            <aside className="lg:w-[380px]">
              <SidebarTopAnime />
            </aside>
          </section>
        </main>
      )}
    </>
  );
};

export default LayoutTwoCols;

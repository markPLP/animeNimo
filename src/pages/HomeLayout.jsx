import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
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
            {/* lg:grid grid-cols-[1fr_auto] */}
            <section className="md:w-full lg:w-[69%] flex-grow">
              <Outlet />
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

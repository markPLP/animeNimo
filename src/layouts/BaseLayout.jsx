import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import { Loading, Navbar } from '../components';
import { memo, Suspense } from 'react';
import Footer from './Footer';

const BaseLayout = () => {
  const navigation = useNavigation();
  // grab loaderData/useLoaderData and pass as prop
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
      <Suspense fallback={<Loading />}>
        {isPageLoading ? (
          <Loading extendClass="h-screen" />
        ) : (
          <main>
            <Outlet />
          </main>
        )}
      </Suspense>
      <Footer />
    </>
  );
};

export default memo(BaseLayout);

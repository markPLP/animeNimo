import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Landing,
  Types,
  Error,
  Login,
  Register,
  WatchSingle,
  SearchResults,
  RecentlyAdded,
  AzList,
  GenreSingle,
} from './pages';
import { BaseLayout } from './layouts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// LOADERS
import { loader as LandingLoader } from './pages/Landing';
import { loader as SearchResultsLoader } from './pages/SearchResults';
import { loader as RecentlyAddedLoader } from './pages/RecentlyAdded';
import { loader as AzListLoader } from './pages/AzList';
import { loader as WatchSingleLoader } from './pages/WatchSingle';
import { loader as GenreSingleLoader } from './pages/GenreSingle';
import { AppProvider } from './context';
import LayoutTwoCols from './layouts/LayoutTwoCols';
import { Loading } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: LandingLoader(queryClient),
      },
      {
        element: <LayoutTwoCols />,
        children: [
          {
            path: 'watch/:mal_id/:title',
            element: <WatchSingle />,
            loader: WatchSingleLoader(queryClient),
          },
          {
            path: 'search-results',
            element: <SearchResults />,
            loader: SearchResultsLoader(queryClient),
          },
          {
            path: 'genre-single/:mal_id',
            element: <GenreSingle />,
            loader: GenreSingleLoader(queryClient),
          },
          // {
          //   path: 'genre',
          //   element: <Genre />,
          // },
          {
            path: 'types',
            element: <Types />,
          },
          {
            path: 'recently-added',
            element: <RecentlyAdded />,
            loader: RecentlyAddedLoader,
          },
          {
            path: 'az-list',
            element: <AzList />,
            loader: AzListLoader(queryClient),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Loading extendClass="h-screen" />}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  );
};
export default App;

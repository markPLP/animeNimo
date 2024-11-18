import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Landing,
  Genre,
  Types,
  Error,
  Login,
  Register,
  WatchSingle,
  SearchResults,
  RecentlyAdded,
  AzList,
} from './pages';
import { BaseLayout } from './layouts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// LOADERS
import { loader as LandingLoader } from './pages/Landing';
import { loader as SearchResultsLoader } from './pages/SearchResults';
import { loader as RecentlyAddedLoader } from './pages/RecentlyAdded';
//import { loader as WatchSingleLoader } from './pages/WatchSingle';
import { AppProvider } from './context';
import LayoutTwoCols from './layouts/LayoutTwoCols';

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
            path: 'watch/:mal_id',
            element: <WatchSingle />,
            // loader: WatchSingleLoader(queryClient),
          },
          {
            path: 'search-results',
            element: <SearchResults />,
            loader: SearchResultsLoader(queryClient),
          },
          {
            path: 'genre',
            element: <Genre />,
          },
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
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryClientProvider>
  );
};
export default App;

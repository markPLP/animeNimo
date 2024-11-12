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
} from './pages';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// LOADERS
import BaseLayout, { loader as BaseLayoutLoader } from './layouts/BaseLayout';
import { loader as SearchResultsLoader } from './pages/SearchResults';
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
    loader: BaseLayoutLoader(queryClient),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        element: <LayoutTwoCols />,
        children: [
          {
            path: '/watch/:mal_id',
            element: <WatchSingle />,
            // loader: WatchSingleLoader(queryClient),
          },
          {
            path: '/search-results',
            element: <SearchResults />,
            loader: SearchResultsLoader(queryClient),
          },
          {
            path: '/genre',
            element: <Genre />,
          },
          {
            path: '/types',
            element: <Types />,
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

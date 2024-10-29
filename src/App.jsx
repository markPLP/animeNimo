import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  HomeLayout,
  Landing,
  Genre,
  GenreSingle,
  Types,
  TypeSingle,
  Error,
  Login,
  Register,
  Updated,
  Watch,
  WatchSingle,
} from './pages';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TwoColLayout from './layouts/TwoColLayout';

// LOADERS
import { loader as HomeLayoutLoader } from './pages/HomeLayout';
import { loader as WatchSingleLoader } from './pages/WatchSingle';

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
    element: <HomeLayout />,
    errorElement: <Error />,
    loader: HomeLayoutLoader(queryClient),
    children: [
      {
        index: true,
        element: <Landing />,
        // loader: landingLoader(queryClient),
      },
    ],
  },
  {
    element: <TwoColLayout />,
    children: [
      {
        path: '/genre',
        element: <Genre />,
      },
      {
        path: '/types',
        element: <Types />,
      },
      {
        path: '/updated',
        element: <Updated />,
      },
      {
        path: '/watch/:mal_id',
        element: <WatchSingle />,
        loader: WatchSingleLoader(queryClient),
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
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

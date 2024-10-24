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
} from './pages';

// import Hero from './components/Hero';

// LOADERS
//import { loader as heroLoader } from './components/Hero';

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
    children: [
      {
        index: true,
        element: <Landing />,
        // children: [
        //   {
        //     path: 'hero',
        //     element: <Hero />,
        //     loader: heroLoader, // Loader for FirstComponent
        //   },
        // {
        //   path: 'second',
        //   element: <SecondComponent />,
        //   loader: loader2, // Loader for SecondComponent
        // },
        // ],
      },
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
    </QueryClientProvider>
  );
};
export default App;

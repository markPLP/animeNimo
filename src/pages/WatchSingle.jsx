import { useParams } from 'react-router-dom';
import { useGetFullAnimeQuery } from '../utils/reactQueryCustomHooks';
import { Loading } from '../components';
import { QueryClient } from '@tanstack/react-query';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log('params url', new URL(request.url).searchParams.entries());

    return null;
  };

const WatchSingle = () => {
  const { mal_id } = useParams();
  const { data } = useGetFullAnimeQuery(mal_id);
  console.log(data); // Extract mal_id from the route
  // const { isLoading, data, isError } = useGetFullAnimeQuery(mal_id);

  // if (isLoading) return <Loading />;
  // if (isError) return <div>Something went wrong...</div>;

  return <div>WatchSingle: {mal_id}</div>; // Display the mal_id for testing
};

export default WatchSingle;

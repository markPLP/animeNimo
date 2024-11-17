import { useParams } from 'react-router-dom';
import { Loading } from '../components';
import { QueryClient } from '@tanstack/react-query';
import { useFetchFullAnime } from '../hooks/useFetchFullAnime';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log('params url', new URL(request.url).searchParams.entries());

    return null;
  };

const WatchSingle = () => {
  const { mal_id } = useParams();
  const { data } = useFetchFullAnime(mal_id);

  return <div>WatchSingle: {mal_id}</div>; // Display the mal_id for testing
};

export default WatchSingle;

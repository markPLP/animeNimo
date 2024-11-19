import { useParams } from 'react-router-dom';
import { WatchAnime } from '../components';
import { customFetch } from '../utils';

const singleWatchQuery = (mal_id) => {
  return {
    queryKey: ['singleWatchAnime', mal_id],
    queryFn: () => {
      return customFetch.get(`/anime/${mal_id}/episodes`);
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { mal_id } = params;

    const response = await queryClient.ensureQueryData(
      singleWatchQuery(mal_id)
    );

    const data = response.data.data;
    const pagination = response.data.pagination;

    return { data, pagination };
  };

const WatchSingle = () => {
  const { mal_id } = useParams();
  console.log(mal_id, 'from useParams');

  return (
    <>
      WatchSingle: {mal_id}
      <WatchAnime />
    </>
  ); // Display the mal_id for testing
};

export default WatchSingle;

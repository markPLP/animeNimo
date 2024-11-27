import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
import { customFetch } from '../utils';

const filterGenreQuery = (mal_id) => {
  return {
    queryKey: ['singleFilterGenre', mal_id],
    queryFn: () => {
      return customFetch.get(`/anime?genres=${mal_id}`);
    },
    retry: (failureCount, error) => {
      // Retry up to 3 times for 404 or 429 errors
      if (error?.message.includes('404') || error?.message.includes('429')) {
        return failureCount < 3;
      }
      return false; // Do not retry for other errors
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { mal_id } = params;

    const response = await queryClient.ensureQueryData(
      filterGenreQuery(mal_id)
    );
    const filteredGenre = response.data.data;

    return { filteredGenre };
  };

const Genre = () => {
  const { filteredGenre } = useLoaderData();

  if (filteredGenre.length === 0) {
    return <div>No matches found...</div>;
  }
  return (
    <>
      <GridSearchResults data={filteredGenre} />
      <Pagination />
    </>
  );
};

export default Genre;

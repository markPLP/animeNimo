import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
import { customFetch } from '../utils';

const filterGenreQuery = (mal_id) => {
  return {
    queryKey: ['singleFilterGenre', mal_id],
    queryFn: () => {
      return customFetch.get(`/anime?genres=${mal_id}`);
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

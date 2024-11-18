import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
import { useFetchSearchAnime } from '../hooks/useFetchSearchAnime';

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const { animeListResponse, paginationResponse } = await useFetchSearchAnime(
      queryClient,
      { request }
    );

    return { animeList: animeListResponse, pagination: paginationResponse };
  };

const SearchResults = () => {
  const { animeList, pagination } = useLoaderData();

  if (animeList.length === 0) {
    return <div>No matches found...</div>;
  }
  return (
    <>
      <GridSearchResults data={animeList} />
      <Pagination />
    </>
  );
};

export default SearchResults;

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
  const { animeList } = useLoaderData();

  if (animeList.length === 0) {
    return <div className="mt-6 text-[20px]">No matches found...</div>;
  }
  return (
    <div className="mt-6">
      <GridSearchResults data={animeList} />
      <Pagination />
    </div>
  );
};

export default SearchResults;

import { useLoaderData, useLocation } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
// import { searchAnimeLoader } from '../loaders/Loaders';
// export const loader =
//   (queryClient) =>
//   async ({ request }) => {
//     // Call searchAnimeLoader with queryClient and request
//     const { animeListResponse, paginationResponse } = await searchAnimeLoader(
//       queryClient,
//       { request }
//     );
//     return { animeList: animeListResponse, pagination: paginationResponse };
//   };

const SearchResults = ({ searchParams }) => {
  const { animeList, pagination } = useLoaderData();

  if (animeList.length === 0) {
    return <div>No matches found...</div>;
  }
  return (
    <>
      <GridSearchResults data={animeList} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default SearchResults;

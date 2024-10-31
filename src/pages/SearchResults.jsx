import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
import { searchAnimeLoader } from '../loaders/Loaders';
import { customFetch } from '../utils';
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // Call searchAnimeLoader with queryClient and request
    const { animeListResponse, paginationResponse } = await searchAnimeLoader(
      queryClient,
      { request }
    );
    return { animeList: animeListResponse, pagination: paginationResponse };
  };

// export const loader = async ({ request }) => {
//   const params = Object.fromEntries([
//     ...new URL(request.url).searchParams.entries(),
//   ]);
//   console.log(url, 'urlparams');

//   const response = await customFetch.get(url, { params });

//   console.log(params, 'params');
//   console.log(response, 'response');

//   return response;
// };

const SearchResults = () => {
  const { animeList, pagination } = useLoaderData();

  return (
    <>
      <GridSearchResults data={animeList} />
      <Pagination pagination={pagination} />
    </>
  );
};

export default SearchResults;

import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';

const searchByLetterQuery = (queryParams, request) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('letter') || '';

  const { letter, page } = queryParams;

  // Default to `letter=` when `searchTerm` is 'all'
  const queryLetter = searchTerm === 'all' ? '' : letter ?? searchTerm;

  return {
    queryKey: ['searchByLetter', queryLetter, page ?? 1],
    queryFn: async () => {
      const response = await customFetch.get('/anime', {
        params: { letter: queryLetter, page: page ?? 1, sfw: true },
      });
      return response;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    try {
      const queryParams = Object.fromEntries(
        new URL(request.url).searchParams.entries()
      );

      const response = await queryClient.ensureQueryData(
        searchByLetterQuery(queryParams, request) // Pass `request` directly
      );

      console.log(queryParams, 'queryParams queryParams');
      console.log(response, 'responseresponseresponse searchByLetterQuery');

      const data = response.data.data;
      const pagination = response.data.pagination;

      return { data, pagination };
    } catch (error) {
      console.error('Error in loader:', error);
      throw new Response('Failed to fetch data for the page', { status: 500 });
    }
  };

const AzList = () => {
  const { data } = useLoaderData();
  return (
    <div>
      <GridSearchResults data={data} />
      <Pagination />
    </div>
  );
};

export default AzList;

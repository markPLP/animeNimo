import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';

const searchByLetterQuery = (queryParams, request) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('letter') || '';

  const { letter, page } = queryParams;
  return {
    queryKey: ['searchByLetter', letter ?? searchTerm, page ?? 1],
    queryFn: async () => {
      const response = await customFetch.get('/anime?sfw=true', {
        params: queryParams,
      });
      // const response = await customFetch.get(`/anime?letter=${queryParams}`);
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
  const { data, pagination } = useLoaderData();

  console.log(data, 'from data useloarder');
  console.log(pagination, 'from pagination useloarder');

  return (
    <div>
      <GridSearchResults data={data} />
      <Pagination />
    </div>
  );
};

export default AzList;

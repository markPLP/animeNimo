import { useLoaderData, useNavigate } from 'react-router-dom';
import { GridSearchResults, Pagination } from '../components';
import { customFetch } from '../utils';
import { useEffect } from 'react';

const filterGenreQuery = (mal_id) => {
  return {
    queryKey: ['singleFilterGenre', mal_id],
    queryFn: () => {
      return customFetch.get(`/anime?genres=${mal_id}&sfw=true`);
    },
    retry: (failureCount, error) => {
      // Retry up to 3 times for 404 or 429 errors
      const status = error?.message?.split(':')[0]; // Extract status from error message
      if (status === '404' || status === '429') {
        return failureCount < 3;
      }
      return false; // Do not retry for other errors
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const { mal_id } = params;
    const url = new URL(request.url);

    // Extract query parameters (e.g., page, sfw)
    const sfw = url.searchParams.get('sfw') || 'true'; // Default to 'sfw=true'
    const page = url.searchParams.get('page') || 1; // Default to page 1

    // Ensure query parameters are part of the API request
    try {
      const response = await queryClient.ensureQueryData({
        queryKey: ['singleFilterGenre', mal_id, { sfw, page }],
        queryFn: () => {
          return customFetch.get(
            `/anime?genres=${mal_id}&sfw=${sfw}&page=${page}`
          );
        },
      });

      const singleGenreItem = response.data.data;
      const singleGenrePagination = response.data.pagination;

      return { singleGenreItem, pagination: singleGenrePagination };
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404 || status === 429) {
        console.warn(`Error ${status}: Retrying...`);
        throw new Error(`${status}: Retrying...`);
      }

      console.error('Error fetching genres data:', error);
      throw new Response('Failed to load genres data', { status: 500 });
    }
  };

const GenreSingle = () => {
  const { singleGenreItem } = useLoaderData();

  if (singleGenreItem.length === 0) {
    return <div>No matches found...</div>;
  }
  return (
    <div className="mt-6">
      <GridSearchResults data={singleGenreItem} />
      <Pagination />
    </div>
  );
};

export default GenreSingle;

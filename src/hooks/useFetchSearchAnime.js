import { customFetch } from '../utils';

export const useFetchSearchAnime = async (queryClient, { request }) => {
  // Get search term from URL on load/form submit
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q') || '';

  const searchTermQuery = (queryParams) => {
    const { type, status, order_by, score, search, page, genres, start_date } =
      queryParams;
    return {
      queryKey: [
        'filterAnime',
        search ?? searchTerm,
        type ?? '',
        status ?? '',
        order_by ?? '',
        score ?? 9.99,
        genres ?? '',
        start_date ?? '',
        page ?? 1,
      ],
      queryFn: () => {
        return customFetch.get('/anime?sfw=true', { params: queryParams });
      },
      enable: Boolean(searchTerm), // Only run query if searchTerm has a value
    };
  };

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const searchAnimeResponse = await queryClient.ensureQueryData(
      searchTermQuery(params)
    );
    const animeListResponse = searchAnimeResponse?.data?.data;
    const paginationResponse = searchAnimeResponse?.data?.pagination;

    return { animeListResponse, paginationResponse };
  } catch (error) {
    console.error('Error fetching searched anime:', error);
    throw new Response('Failed to load searched anime', { status: 500 });
  }
};

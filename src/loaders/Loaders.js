import { customFetch } from '../utils';

const createQuery = (key, url) => ({
  queryKey: key,
  queryFn: () => customFetch.get(url),
});

// OPTIONAL: Utility function to filter items
const filterItems = (items, limit) =>
  items.filter((item) => !item.region_locked).slice(0, limit);

// Fetch queries
const getHeroBannerQuery = createQuery(['heroBanner'], 'top/anime');
const getPopularAnimeQuery = createQuery(
  ['popularAnime'],
  '/watch/episodes/popular'
);
const getAllGenresQuery = createQuery(['AllGenres'], '/genres/anime');

export const allGenresLoader = async (queryClient) => {
  try {
    const allGenresResponse = await queryClient.ensureQueryData(
      getAllGenresQuery
    );
    // console.log(allGenresResponse, 'from allGenresResponse');
    // const mal_id = allGenresResponse.data.data;
    // const genraName = allGenresResponse.data.data.name;

    // console.log(mal_id);

    // return { mal_id, genraName };
    return allGenresResponse.data.data;
    // return filterItems(allGenresResponse.data.data, 10);
  } catch (error) {
    console.error('Error fetching genres data:', error);
    throw new Response('Failed to load genres data', { status: 500 });
  }
};

export const heroBannerLoader = async (queryClient) => {
  try {
    const heroResponse = await queryClient.ensureQueryData(getHeroBannerQuery);
    console.log(heroResponse);

    return filterItems(heroResponse.data.data, 10);
  } catch (error) {
    console.error('Error fetching hero banner data:', error);
    throw new Response('Failed to load hero banner data', { status: 500 });
  }
};

export const popularAnimeLoader = async (queryClient) => {
  try {
    const popularAnimeResponse = await queryClient.ensureQueryData(
      getPopularAnimeQuery
    );

    return filterItems(popularAnimeResponse.data.data, 15);
  } catch (error) {
    console.error('Error fetching popular anime data:', error);
    throw new Response('Failed to load popular anime data', { status: 500 });
  }
};

// searchAnimeLoader function
export const searchAnimeLoader = async (queryClient, { request }) => {
  // Get search term from URL on load/form submit
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || '1';

  const searchTermQuery = {
    queryKey: ['searchItems', searchTerm, page],
    queryFn: () =>
      customFetch.get(`/anime?sfw=true&q=${searchTerm}&page=${page}`),
  };

  try {
    const searchAnimeResponse = await queryClient.ensureQueryData(
      searchTermQuery
    );
    const animeListResponse = searchAnimeResponse?.data?.data;
    const paginationResponse = searchAnimeResponse?.data?.pagination;

    console.log(searchAnimeResponse, 'searchAnimeResponse');
    console.log(paginationResponse, 'paginationResponse');

    return { animeListResponse, paginationResponse };
  } catch (error) {
    console.error('Error fetching searched anime:', error);
    throw new Response('Failed to load searched anime', { status: 500 });
  }
};

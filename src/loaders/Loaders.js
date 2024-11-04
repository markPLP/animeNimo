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

    return allGenresResponse.data.data;
  } catch (error) {
    console.error('Error fetching genres data:', error);
    throw new Response('Failed to load genres data', { status: 500 });
  }
};

export const heroBannerLoader = async (queryClient) => {
  try {
    const heroResponse = await queryClient.ensureQueryData(getHeroBannerQuery);

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
  // const page = url.searchParams.get('page') || '1';

  // const searchTermQuery = {
  //   queryKey: ['searchItems', searchTerm, page],
  //   queryFn: () =>
  //     customFetch.get(`/anime?sfw=true&q=${searchTerm}&page=${page}`),
  // };

  const searchTermQuery = (queryParams) => {
    const { type, status, order_by, score, search, page } = queryParams;
    return {
      queryKey: [
        'filterAnime',
        type ?? '',
        status ?? '',
        order_by ?? '',
        score ?? '',
        search ?? searchTerm,
        page ?? 1,
      ],
      queryFn: () => {
        return customFetch.get('/anime?sfw=true', { params: queryParams });
      },
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
    // console.log(animeListResponse, 'animeListResponse');
    // console.log(paginationResponse, 'paginationResponse');

    return { animeListResponse, paginationResponse };
  } catch (error) {
    console.error('Error fetching searched anime:', error);
    throw new Response('Failed to load searched anime', { status: 500 });
  }
};

// // FILTER LOADER

// const filterAnimeQuery = (queryParams) => {
//   const { type, status, order_by, score, search } = queryParams;

//   return {
//     queryKey: [
//       'filterAnime',
//       type ?? '',
//       status ?? '',
//       order_by ?? '',
//       score ?? '',
//       search ?? '',
//     ],
//     queryFn: () => {
//       return customFetch.get('/anime', { params: queryParams });
//     },
//   };
// };

// export const filterAnimeLoader = async (queryClient, { request }) => {
//   try {
//     const params = Object.fromEntries([
//       ...new URL(request.url).searchParams.entries(),
//     ]);

//     const response = await queryClient.ensureQueryData(
//       filterAnimeQuery(params)
//     );
//     console.log(response, 'from filterAnimeLoader');

//     return null;
//   } catch (error) {
//     console.error('Error fetching filterAnimeLoader:', error);
//     throw new Response('Failed to load filterAnimeLoader', { status: 500 });
//   }
// };

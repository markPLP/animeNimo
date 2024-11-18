// import { useQuery } from '@tanstack/react-query';
// import { customFetch } from '../utils';

// export const searchByLetterQuery = (queryParams) => {
//   const { letter, page } = queryParams;
//   return {
//     queryKey: ['searchByLetter', letter ?? '', page ?? 1],
//     queryFn: async () => {
//       const response = await customFetch.get(`/anime?letter=${queryParams}`);
//       // const response = await customFetch.get('/anime', { queryParams });
//       console.log(response, 'from response response response');

//       return response;
//     },
//   };
// };

// export const useFetchLetters = ({ request }) => {
//   const url = new URL(request.url);
//   const searchTerm = url.searchParams.get('letter') || '';
//   const { data, isLoading, isError } = useQuery(
//     searchByLetterQuery(searchTerm)
//   );

//   return { data, isLoading, isError };
// };

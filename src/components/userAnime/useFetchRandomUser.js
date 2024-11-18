import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../../utils';

export const randomUserQuery = {
  queryKey: ['randomUser'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('/random/users');
      const username = response?.data?.data?.username;
      console.log(username, 'from random user');
      return username;
    } catch (error) {
      console.error('Error fetching random user data:', error);
      throw new Response('Failed to load random user data', { status: 500 });
    }
  },
};

export const userFullDetailsQuery = (username) => ({
  queryKey: ['userFullDetails', username],
  queryFn: async () => {
    try {
      // Make an API call to get the full details of the user
      const response = await customFetch.get(`/users/${username}/full`);

      // Return the full user data
      return response?.data?.data;
    } catch (error) {
      console.error(`Error fetching full details for ${username}:`, error);
      throw new Response('Failed to load full user data', { status: 500 });
    }
  },
});

export const useFetchRandomUser = () => {
  const {
    data: username,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(randomUserQuery.queryKey, randomUserQuery.queryFn);

  // Fetch the full details of the user only after username is available
  const {
    data: fullUserData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useQuery(userFullDetailsQuery(username), {
    enabled: !!username, // Ensure this query only runs after we have a username
  });

  // Combine loading and error states
  const isLoading = isUserLoading || isDetailsLoading;
  const isError = isUserError || isDetailsError;
  console.log(fullUserData, 'full data from useFetchRandom');

  return { fullUserData, isLoading, isError };
};

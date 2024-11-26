import { useQuery } from '@tanstack/react-query';
import { customFetch } from '../../utils';

export const randomUserQuery = {
  queryKey: ['randomUser'],
  queryFn: async () => {
    try {
      const response = await customFetch.get('/random/users');
      console.log(response, 'responseresponseresponse');
      const data = response?.data?.data;

      return data;
    } catch (error) {
      if (error?.response?.status === 404) {
        console.warn('404 error: Retrying...');
        throw new Error('404: Resource not found.');
      }
      console.error('Error fetching random user data:', error);
      throw new Response('Failed to load random user data', { status: 500 });
    }
  },
  retry: (failureCount, error) => {
    // Retry up to 3 times only if the error is a 404
    if (error?.message.includes('404') && failureCount < 3) {
      return true;
    }
    return false; // Do not retry for other errors
  },
};

export const useFetchRandomUser = () => {
  const {
    data: username,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchRandomUser, // Refetch function for random user
  } = useQuery(randomUserQuery.queryKey, randomUserQuery.queryFn, {
    retry: (failureCount, error) => error.message.includes('404'), // Retry on 404 error
  });

  const {
    data: fullUserData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    refetch: refetchUserDetails, // Refetch function for user details
  } = useQuery(
    userFullDetailsQuery(username).queryKey,
    userFullDetailsQuery(username).queryFn,
    {
      enabled: !!username, // Ensure this query only runs after we have a username
      retry: (failureCount, error) => error.message.includes('404'), // Retry on 404 error
    }
  );

  const isLoading = isUserLoading || isDetailsLoading;
  const isError = isUserError || isDetailsError;

  // Trigger refetch manually if needed
  const refetch = async () => {
    if (isUserError) await refetchRandomUser();
    if (isDetailsError) await refetchUserDetails();
  };

  console.log(fullUserData, 'full data from useFetchRandom');

  return { fullUserData, isLoading, isError, refetch };
};

// export const userFullDetailsQuery = (username) => ({
//   queryKey: ['userFullDetails', username],
//   queryFn: async () => {
//     try {
//       const response = await customFetch.get(`/users/${username}/full`);
//       return response?.data?.data;
//     } catch (error) {
//       if (error?.response?.status === 404) {
//         // Refetch logic for 404
//         throw new Error('404: User details not found. Retrying...');
//       }
//       console.error(`Error fetching full details for ${username}:`, error);
//       throw new Response('Failed to load full user data', { status: 500 });
//     }
//   },
// });

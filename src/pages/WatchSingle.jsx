import { useLoaderData, useParams } from 'react-router-dom';
import {
  AnimeDetailed,
  PaginationAnimeEpisodes,
  WatchAnime,
} from '../components';
import { customFetch } from '../utils';

const singleAnimeDetailsQuery = (mal_id) => ({
  queryKey: ['animeDetails', mal_id],
  queryFn: () => customFetch.get(`/anime/${mal_id}/full`),
});

export const loader =
  (queryClient) =>
  async ({ params: { mal_id, title }, request }) => {
    const isNumeric = /^\d+$/.test(mal_id);
    const getAnimeDetails = async (id) =>
      queryClient.ensureQueryData(singleAnimeDetailsQuery(id));

    // Step 1: Determine if we have mal_id or title and fetch the corresponding anime details
    const animeDetails = isNumeric
      ? await getAnimeDetails(mal_id) // If numeric, fetch using mal_id
      : await (async () => {
          const {
            data: { data: allAnime },
          } = await customFetch.get('/anime');
          const foundAnime = allAnime.find(
            ({ title: t }) => t.toLowerCase().replace(/ /g, '-') === title
          );
          if (!foundAnime)
            throw new Response('Anime not found', { status: 404 });
          return getAnimeDetails(foundAnime.mal_id); // Fetch using the resolved mal_id
        })();

    const { title: animeTitle, mal_id: numericMalId } = animeDetails.data.data;
    const formattedTitle = animeTitle.toLowerCase().replace(/ /g, '-');

    // Step 2: Redirect to the proper URL if necessary
    const currentPath = new URL(request.url).pathname;
    if (currentPath !== `/watch/${numericMalId}/${formattedTitle}`) {
      throw new Response(null, {
        status: 302,
        headers: { Location: `/watch/${numericMalId}/${formattedTitle}` },
      });
    }

    const allData = animeDetails.data.data;

    // console.log(allData, 'from allData allData');

    return { title: animeTitle, mal_id: numericMalId, animeDetails: allData };
  };

const WatchSingle = () => {
  const { mal_id } = useParams();
  const { animeDetails } = useLoaderData();

  console.log(animeDetails, 'from useloaderdata1');

  return (
    <>
      WatchSingle: {mal_id}
      <PaginationAnimeEpisodes />
      <AnimeDetailed />
    </>
  ); // Display the mal_id for testing
};

export default WatchSingle;

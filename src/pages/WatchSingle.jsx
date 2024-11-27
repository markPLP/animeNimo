import { useLoaderData, useParams } from 'react-router-dom';
import { AnimeDetailed, PaginationAnimeEpisodes } from '../components';
import { customFetch } from '../utils';
import { createContext, useContext, useState } from 'react';
import WatchBySingleEpisode from '../components/WatchBySingleEpisode';

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
    return { title: animeTitle, mal_id: numericMalId, animeDetails: allData };
  };

export const singleEpisodeContext = createContext();

// custom hook is a function
export const useSingleEpisodeContext = () => useContext(singleEpisodeContext);

const WatchSingle = () => {
  const [singleEpisode, setSingleEpisode] = useState(1);

  return (
    <singleEpisodeContext.Provider value={{ singleEpisode, setSingleEpisode }}>
      <AnimeDetailed />
      <PaginationAnimeEpisodes />
      <WatchBySingleEpisode />
    </singleEpisodeContext.Provider>
  ); // Display the mal_id for testing
};

export default WatchSingle;

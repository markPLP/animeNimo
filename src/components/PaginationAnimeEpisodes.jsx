import { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useFetchEpisodes } from '../hooks/useFetchEpisodes';
import WatchAnimeEpisodesListButton from './WatchAnimeEpisodesListButton';
import { Loading } from '../components';
const PaginationAnimeEpisodes = ({
  lastVisiblePage = 1,
  hasNextPage = false,
}) => {
  const { mal_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Initial data fetched using useLoaderData()
  const { data: loaderData, pagination: loaderPagination } = useLoaderData();

  // Fetch episodes based on current page
  const { episodes, isLoading, isError, error } = useFetchEpisodes(
    mal_id,
    currentPage
  );

  // Default to loaderData if episodes are not yet fetched
  const dataToDisplay = episodes || loaderData;

  const goToNextPage = () => {
    if (currentPage < lastVisiblePage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (currentPage === 1 && loaderData) {
      // Optionally handle anything specific on initial load
    }
  }, [currentPage, loaderData]);

  if (isLoading) return <Loading />;
  if (isError) return <p>{error?.message || 'Failed to fetch data'}</p>;

  return (
    <div className="bg-base-300 p-5">
      {/* Pagination Controls */}
      {loaderPagination.has_next_page === true && (
        <div className="pagination mb-4">
          <button
            className="btn bg-primary"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-2">
            Page {currentPage} of {lastVisiblePage}
          </span>
          <button
            className="btn bg-primary"
            onClick={goToNextPage}
            disabled={!hasNextPage || currentPage === lastVisiblePage}
          >
            Next
          </button>
        </div>
      )}

      {/* Display episodes */}
      <div className="flex flex-wrap gap-2 w-full">
        {dataToDisplay.length > 0 ? (
          dataToDisplay.map((episode) => (
            <WatchAnimeEpisodesListButton
              key={episode.mal_id}
              malId={episode.mal_id}
              title={episode.title}
            />
          ))
        ) : (
          <p>No episodes available for this page.</p>
        )}
      </div>
    </div>
  );
};

export default PaginationAnimeEpisodes;

import { useParams } from 'react-router-dom';
import { memo, useCallback, useMemo, useState } from 'react';
import { useFetchEpisodes } from '../hooks/useFetchEpisodes';
import Loading from './Loading';
import WatchAnimeButtonList from './WatchAnimeButtonList';
import { useSingleEpisodeContext } from '../pages/WatchSingle';

// eslint-disable-next-line react/display-name
const PaginationAnimeEpisodes = () => {
  const { mal_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { singleEpisode } = useSingleEpisodeContext();
  const { episodes, pagination, isLoading, isError, error } = useFetchEpisodes(
    mal_id,
    currentPage
  );

  const { last_visible_page, has_next_page } = pagination;

  const goToNextPage = useCallback(() => {
    if (currentPage < last_visible_page) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, last_visible_page]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Memoize the pagination controls
  const paginationControls = useMemo(() => {
    if (last_visible_page <= 1) return null;

    return (
      <div className="pagination">
        <button
          className="btn bg-primary"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-2">
          Page {currentPage} of {last_visible_page}
        </span>
        <button
          className="btn bg-primary"
          onClick={goToNextPage}
          disabled={!has_next_page || currentPage === last_visible_page}
        >
          Next
        </button>
      </div>
    );
  }, [
    currentPage,
    last_visible_page,
    has_next_page,
    goToNextPage,
    goToPrevPage,
  ]);

  if (isError || error)
    return <p>{error?.message || 'Failed to fetch data'}</p>;

  return (
    <div className="flex flex-wrap gap-2 mt-4 flex-col">
      <div className="flex flex-col gap-4 justify-between mb-5 sm:flex-row sm:items-center">
        <p className="text-[20px]">
          You are viewing episodes <span>{singleEpisode}</span>
        </p>
        {paginationControls}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <WatchAnimeButtonList episodes={episodes} />
        </>
      )}
    </div>
  );
};

export default memo(PaginationAnimeEpisodes);

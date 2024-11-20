import { useParams } from 'react-router-dom';
import { memo, useCallback, useMemo, useState } from 'react';
import { useFetchEpisodes } from '../hooks/useFetchEpisodes';
import Loading from './Loading';
import WatchAnimeButtonList from './WatchAnimeButtonList';

// eslint-disable-next-line react/display-name
const PaginationAnimeEpisodes = () => {
  const { mal_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { episodes, pagination, isLoading, isError, error } = useFetchEpisodes(
    mal_id,
    currentPage
  );

  const { last_visible_page, has_next_page } = pagination;

  // const newdata = {
  //   lastVisiblePage: pagination.last_visible_page,
  //   hasNextPage: pagination.has_next_page, // Dynamically use actual next page flag
  // };

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

  const handleChange = useCallback(
    (mal_id) => {
      console.log(mal_id, 'from single button ID');
    },
    [mal_id]
  );

  // if (isLoading) return <Loading />;
  // if (isError) return <p>{error?.message || 'Failed to fetch data'}</p>;

  return (
    <div className="flex flex-wrap gap-2 mt-4 flex-col">
      <div className="pagination mb-4">
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
      {isLoading ? (
        <Loading />
      ) : (
        <WatchAnimeButtonList
          episodes={episodes}
          onChange_setMal_id={handleChange}
        />
      )}
    </div>
  );
};

export default memo(PaginationAnimeEpisodes);

// import React, { useCallback, useMemo, useState } from 'react';
// import { useFetchSingleEpisodes } from '../hooks/useFetchEpisodes';
// import Loading from './Loading';
// import WatchPerEpisode from './WatchPerEpisode';

// const PaginationAnimeEpisodes = ({ EpData, parentEpisodeId }) => {
//   const [episodeById, setEpisodeById] = useState(1);

//   const { episode, isLoading, isError, error } = useFetchSingleEpisodes(
//     parentEpisodeId,
//     episodeById
//   );

//   const selectedsingleEpisode = useCallback((episodeId) => {
//     setEpisodeById(episodeId);
//     console.log(episodeId, 'change from button click episodeId');
//   }, []);

//   const memoizedEpData = useMemo(() => EpData, [EpData]);
//   console.log(memoizedEpData, 'from memoizedEpData');

//   if (isLoading) return <Loading />;
//   if (isError) return <p>{error?.message || 'Failed to fetch data'}</p>;

//   return (

//   );
// };

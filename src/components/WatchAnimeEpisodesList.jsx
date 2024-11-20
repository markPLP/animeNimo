// import { useParams } from 'react-router-dom';
// import PaginationAnimeEpisodes from './PaginationAnimeEpisodes';
// import { memo, useCallback, useMemo, useState } from 'react';
// import { useFetchEpisodes } from '../hooks/useFetchEpisodes';
// import Loading from './Loading';

// // eslint-disable-next-line react/display-name
// const WatchAnimeEpisodesList = memo(() => {
//   // const { mal_id } = useParams();
//   // const [currentPage, setCurrentPage] = useState(1);
//   console.log(mal_id, 'from useParams');

//   // const { episodes, pagination, isLoading, isError, error } = useFetchEpisodes(
//   //   mal_id,
//   //   currentPage
//   // );

//   const memoizedEpData = useMemo(() => episodes, [episodes]);
//   const memoizedMal_id = useMemo(() => mal_id, [mal_id]);

//   console.log(pagination.last_visible_page, 'from useFetchEpisodes');

//   const newdata = {
//     lastVisiblePage: pagination.last_visible_page,
//     hasNextPage: pagination.has_next_page, // Dynamically use actual next page flag
//   };
//   console.log(newdata);

//   const goToNextPage = useCallback(() => {
//     if (currentPage < newdata.lastVisiblePage) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [currentPage, newdata.lastVisiblePage]);

//   const goToPrevPage = useCallback(() => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   }, [currentPage]);

//   if (isLoading) return <Loading />;
//   if (isError) return <p>{error?.message || 'Failed to fetch data'}</p>;

//   return (
//     <div className="flex flex-wrap gap-2 mt-4 flex-col">
//       <PaginationAnimeEpisodes
//         lastVisiblePage={newdata.lastVisiblePage}
//         hasNextPage={newdata.hasNextPage}
//         EpData={memoizedEpData}
//         parentEpisodeId={memoizedMal_id}
//       />

//       <div className="pagination mb-4">
//         <button
//           className="btn bg-primary"
//           onClick={goToPrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="px-2">
//           Page {currentPage} of {newdata.lastVisiblePage}
//         </span>
//         <button
//           className="btn bg-primary"
//           onClick={goToNextPage}
//           disabled={
//             !newdata.hasNextPage || currentPage === newdata.lastVisiblePage
//           }
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// });

// export default WatchAnimeEpisodesList;

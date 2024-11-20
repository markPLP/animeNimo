import { useCallback } from 'react';

const WatchAnimeButtonList = ({ episodes, onChange_setMal_id }) => {
  const handleClick = useCallback(
    (mal_id) => {
      onChange_setMal_id(mal_id);
      console.log(mal_id);
    },
    [onChange_setMal_id]
  );
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {/* <WatchAnimeEpisodesList /> */}
      {episodes.length > 0 ? (
        episodes.map((item) => {
          const { mal_id, title } = item;
          return (
            <button
              key={mal_id}
              className="btn btn-primary h-auto min-h-[32px] min-w-[57px] rounded-md px-3 hover:bg-secondary"
              title={title}
              onClick={() => handleClick(mal_id)}
            >
              {mal_id}
            </button>
          );
        })
      ) : (
        <p>No episodes available for this page.</p>
      )}
    </div>
  );

  // return (
  //   <div className="flex flex-wrap gap-2 w-full">
  //     {/* <WatchAnimeEpisodesList /> */}
  //     {episodes.length > 0 ? (
  //       episodes.map((episode) => (
  //         <WatchAnimeEpisodesListButton
  //           key={episode.mal_id}
  //           malId={episode.mal_id}
  //           title={episode.title}
  //           // onSelectionChange={onSelectionChange}
  //         />
  //       ))
  //     ) : (
  //       <p>No episodes available for this page.</p>
  //     )}
  //   </div>
  // );
};

export default WatchAnimeButtonList;

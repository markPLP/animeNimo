import { useCallback } from 'react';
import { useSingleEpisodeContext } from '../pages/WatchSingle';

const WatchAnimeButtonList = ({ episodes }) => {
  const { setSingleEpisode } = useSingleEpisodeContext();

  const handleClick = useCallback(
    (mal_id) => {
      console.log(mal_id, 'from WatchAnimeButtonList');
      setSingleEpisode(mal_id);
    },
    [setSingleEpisode]
  );

  return (
    <div className="gap-2 w-full grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
      {episodes.length > 0 ? (
        episodes.map((item) => {
          const { mal_id, title } = item;
          return (
            <button
              key={mal_id}
              className="btn btn-primary h-auto min-h-[32px] rounded-md px-3 hover:bg-secondary" //flex-basis-[56.7px] min-w-[57px]
              title={title}
              onClick={() => handleClick(mal_id)}
            >
              {mal_id}
            </button>
          );
        })
      ) : (
        <p className="text-2xl mt-8 col-span-12">
          No episode video has been added to this title.
        </p>
      )}
    </div>
  );
};

export default WatchAnimeButtonList;

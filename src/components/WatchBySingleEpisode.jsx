import { useSingleEpisodeContext } from '../pages/WatchSingle';
import { useFetchSingleEpisodes } from '../hooks/useFetchEpisodes';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import { dateFormat, formatDurationInMinutes } from '../utils';
import { useState } from 'react';

const WatchBySingleEpisode = () => {
  const [showMore, setShowMore] = useState(false);
  const { mal_id } = useParams();
  const { singleEpisode } = useSingleEpisodeContext();
  const { episode, isLoading, isError, error } = useFetchSingleEpisodes(
    mal_id,
    singleEpisode
  );

  const { title, aired, duration, synopsis } = episode;
  const episode_malId = episode.mal_id;

  if (isLoading) return <Loading extendClass="min-h-[250px]" />;
  if (isError || error)
    return <p>{error?.message || 'Failed to fetch data'}</p>;

  return (
    <div className="bg-base-300 rounded-lg p-5 mt-8">
      <div className="mb-5">
        <p>
          Title:
          <h4 className="inline-block font-bold italic text-[19px] ml-1">
            {title}
          </h4>
        </p>
        <p>
          Episode:
          <span className="inline-block italic ml-1">{episode_malId}</span>
        </p>
        <p>
          Aired:{' '}
          <span className="inline-block italic ml-1">{dateFormat(aired)}</span>
        </p>
        <p>
          Duration:{' '}
          <span className="inline-block italic">
            {formatDurationInMinutes(duration)} mins
          </span>
        </p>
        <p className="font-bold border-b pb-2 mb-2">Synopsis:</p>
        <p>
          {synopsis && !showMore ? `${synopsis.substring(0, 190)}` : synopsis}
          {synopsis ? (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-secondary ml-2"
            >
              {showMore ? 'Show less' : 'Read more...'}
            </button>
          ) : (
            'N/A'
          )}
        </p>
      </div>
    </div>
  );
};

export default WatchBySingleEpisode;

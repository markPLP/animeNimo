import { memo, useCallback, useMemo, useState } from 'react';
import { topAnimeFilter } from '../utils';
import Loading from './Loading';
import SidebarTopAnimeList from './SidebarTopAnimeList';
import { useFetchTopAnime } from '../hooks/useFetchTopAnime';

const SidebarTopAnime = () => {
  const [filter, setFilter] = useState('airing');
  const { data, isLoading, isError } = useFetchTopAnime(filter);

  const handleFilterClick = useCallback((filterBy) => {
    setFilter(filterBy);
  }, []);

  const memoizedFilters = useMemo(() => topAnimeFilter, []);

  return (
    <div className="relative bg-base-300 rounded-lg mt-5 lg:mt-0">
      <div className="p-4 min-[470px]:flex items-center justify-between lg:flex-col gap-2 lg:items-start">
        <h3 className="text-xl pb-4 min-[470px]:pb-0">Top Anime by</h3>
        <ul className="flex gap-2 min-[470px]:gap-3">
          {memoizedFilters.map((filterBy, index) => (
            <button
              key={index}
              role="tab"
              className={`text-[16px] text-neutral-300 hover:text-secondary block row-auto capitalize ${
                filter === filterBy ? 'tab-active text-secondary' : ''
              }`}
              onClick={() => handleFilterClick(filterBy)}
            >
              {filterBy === 'bypopularity' ? 'popularity' : filterBy}
            </button>
          ))}
        </ul>
      </div>

      <div className="min-h-[270px]">
        {isLoading && <Loading />}
        {isError && (
          <p>Error fetching data: {isError.message || 'Unknown error'}</p>
        )}
        <div className="sm:grid grid-cols-2 lg:grid-cols-1">
          {data && data.length > 0 ? (
            <SidebarTopAnimeList dataTopAnime={data} />
          ) : (
            !isLoading && <p>No top anime available for the selected filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarTopAnime);

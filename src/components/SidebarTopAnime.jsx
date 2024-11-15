import { memo, useCallback, useMemo, useState } from 'react';
import { useGetTopAnimeQuery } from '../utils/reactQueryCustomHooks';
import { formatNumber, topAnimeFilter } from '../utils';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Loading from './Loading';
import GridAnimeHoverElement from './GridAnimeHoverElement';

const SidebarTopAnime = () => {
  //const { topAnime } = useOutletContext();
  const [filter, setFilter] = useState('airing');
  const { data, isLoading, isError } = useGetTopAnimeQuery(filter);

  // Local state for hovering effect
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(false);

  const handleMouseEnter = useCallback((mal_id) => {
    setHoveredCardId(mal_id);
    setHoveredCard(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCardId(null);
    setHoveredCard(false);
  }, []);

  const handleFilterClick = useCallback((filterBy) => {
    setFilter(filterBy);
  }, []);

  const memoizedFilters = useMemo(() => topAnimeFilter, []);
  return (
    <div className="relative bg-base-300 rounded-lg mt-5">
      <div className="p-4 min-[470px]:flex items-center justify-between lg:flex-col gap-2 lg:items-start">
        <h3 className="text-xl pb-4 min-[470px]:pb-0">Top Anime by</h3>
        <ul className="flex gap-2 min-[470px]:gap-3">
          {memoizedFilters.map((filterBy, index) => (
            <button
              key={index}
              role="tab"
              className={`text-[16px] text-neutral-300 hover:text-secondary block row-auto capitalize ${
                filter === filterBy ? 'tab-active text-neutral-50' : ''
              }`}
              onClick={() => handleFilterClick(filterBy)}
            >
              {filterBy === 'bypopularity' ? 'popularity' : filterBy}
            </button>
          ))}
        </ul>
      </div>

      <div className="min-h-[270px]">
        {/* Conditional rendering for loading, error, and data */}
        {isLoading && <Loading />}
        {isError && (
          <p>Error fetching data: {isError.message || 'Unknown error'}</p>
        )}
        <ul className="sm:grid grid-cols-2 lg:grid-cols-1">
          {data && data.length > 0
            ? data.map((animeDeets, index) => {
                const { mal_id, title, scored_by, images } = animeDeets;
                const image = images?.webp?.image_url;
                const imageLarge = images?.webp?.large_image_url;
                let number = index + 1;

                const listItemClasses = `group hover:cursor-pointer flex p-5 gap-4 relative ${
                  index === 0
                    ? 'h-[180px] place-items-end bg-cover col-span-2 lg:col-span-1'
                    : 'items-center'
                }`;

                return (
                  <li
                    className={listItemClasses}
                    style={
                      index === 0
                        ? { backgroundImage: `url(${imageLarge})` }
                        : {}
                    }
                    key={`animeDeets-${mal_id}-${index}`}
                    onMouseEnter={() => handleMouseEnter(mal_id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {index === 0 && (
                      <span className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-t from-base-300/100 to-base-100/0 p-5"></span>
                    )}
                    <div>
                      <span
                        className={`group-hover:text-secondary font-bold leading-[32px] text-[20px] h-[40px] w-[40px] border-2 flex place-content-center rounded-md border-slate-500 text-gray-500 ${
                          index === 0
                            ? 'bg-white border-white text-black relative z-10'
                            : ''
                        }`}
                      >
                        {number}
                      </span>
                    </div>
                    <div
                      className={`flex gap-4 ${
                        index === 0 ? 'relative z-10' : ''
                      }`}
                    >
                      <figure className={`w-[46px] ${index === 0 && 'hidden'}`}>
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-[60px] object-cover"
                          loading="lazy"
                        />
                      </figure>
                      <p
                        className={`group-hover:text-secondary flex-1 ${
                          index === 0 ? 'text-white hover:text-secondary' : ''
                        }`}
                      >
                        <span className="block leading-4 mb-2 text-[16px]">
                          {title}
                        </span>
                        <span>
                          <AiOutlineUsergroupAdd className="text-[20px] inline" />
                          {formatNumber(scored_by)}
                        </span>
                      </p>
                    </div>
                    {hoveredCardId === mal_id && (
                      <GridAnimeHoverElement
                        mal_id={mal_id}
                        hoveredCard={hoveredCard}
                      />
                    )}
                  </li>
                );
              })
            : !isLoading && (
                <p>No top anime available for the selected filter.</p>
              )}
        </ul>
      </div>
    </div>
  );
};

export default memo(SidebarTopAnime);

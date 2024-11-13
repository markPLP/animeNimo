import { useState } from 'react';
import { useGetTopAnimeQuery } from '../utils/reactQueryCustomHooks';
import { topAnimeFilter } from '../utils';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Loading from './Loading';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setCardHover,
//   setCardHoveredId,
// } from '../features/cardHover/CardHoverSlice';
import GridAnimeHoverElement from './GridAnimeHoverElement';

const TopAnime = () => {
  const [filter, setFilter] = useState('airing');
  const { data, isLoading, isError } = useGetTopAnimeQuery(filter);

  // Local state for hovering effect
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(false);

  const handleMouseEnter = (mal_id) => {
    setHoveredCardId(mal_id);
    setHoveredCard(true);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setHoveredCard(false);
  };

  // const { hoveredCard, hoveredCardId } = useSelector(
  //   (state) => state.cardHoverState
  // );
  // console.log(filter, 'fiter thisd');

  // const dispatch = useDispatch();
  // const handleMouseEnter = (mal_id) => {
  //   dispatch(setCardHoveredId(mal_id));
  //   dispatch(setCardHover(true));
  // };

  // const handleMouseLeave = () => {
  //   dispatch(setCardHoveredId(null));
  //   dispatch(setCardHover(false));
  // };

  return (
    <div className="relative bg-base-300 rounded-lg mt-5">
      <div className="p-4 min-[470px]:flex items-center justify-between lg:flex-col gap-2 lg:items-start">
        <h3 className="text-xl pb-4 min-[470px]:pb-0">Top Anime by</h3>
        <ul className="flex gap-2 min-[470px]:gap-3">
          {topAnimeFilter.map((filterBy, index) => {
            return (
              <button
                key={index}
                role="tab"
                className={`text-[16px] text-neutral-300 hover:text-secondary block row-auto capitalize ${
                  filter === filterBy ? 'tab-active text-neutral-50' : ''
                }`}
                onClick={() => setFilter(filterBy)}
              >
                {filterBy === 'bypopularity' ? 'popularity' : filterBy}
              </button>
            );
          })}
        </ul>
      </div>

      <div className="min-h-[570px]">
        {/* Conditional rendering for loading, error, and data */}
        {isLoading && <Loading />}
        {isError && <p>Error fetching data: {isError.message}</p>}
        <ul className="sm:grid grid-cols-2 lg:grid-cols-1">
          {data && data.length > 0
            ? data.map((animeDeets, index) => {
                const { mal_id, title, scored_by } = animeDeets;
                const image = animeDeets?.images?.webp?.image_url;
                const imageLarge = animeDeets?.images?.webp?.large_image_url;
                let number = index + 1;

                return (
                  <li
                    className={`group hover:cursor-pointer flex p-5 gap-4 relative ${
                      index === 0
                        ? 'h-[180px] place-items-end bg-cover col-span-2 lg:col-span-1'
                        : 'items-center'
                    }`}
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
                    <div className="">
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
                        <span className={`block leading-4 mb-2 text-[16px]`}>
                          {title}
                        </span>
                        <span>
                          <AiOutlineUsergroupAdd className="text-[20px] inline" />
                          {scored_by}
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

export default TopAnime;

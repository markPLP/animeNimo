import GridAnimeHoverElement from './GridAnimeHoverElement';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCardHover,
  setCardHoveredId,
} from '../features/cardHover/CardHoverSlice';

const GridSearchResults = ({ data }) => {
  const { hoveredCard, hoveredCardId } = useSelector(
    (state) => state.cardHoverState
  );

  const dispatch = useDispatch();
  const handleMouseEnter = (mal_id) => {
    dispatch(setCardHoveredId(mal_id));
    dispatch(setCardHover(true));
  };

  const handleMouseLeave = () => {
    dispatch(setCardHoveredId(null));
    dispatch(setCardHover(false));
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-[15px]  min-[460px]:grid-cols-3 min-[700px]:grid-cols-4  min-[800px]:grid-cols-5">
        {data.map((card) => {
          const image = card.images?.webp?.large_image_url;
          const title = card.title;
          const mal_id = card.mal_id;
          //const { title, mal_id } = card.entry;
          const latestEp = card.episodes;

          return (
            <div
              key={mal_id}
              className="card bg-base-100 w-full shadow-xl rounded-md relative"
              onMouseEnter={() => handleMouseEnter(mal_id)}
              onMouseLeave={handleMouseLeave}
            >
              <figure className="relative overflow-hidden pt-[150%]">
                <img
                  src={image}
                  alt={title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </figure>
              <div className="p-2 relative flex items-baseline justify-start">
                <h2 className="font-normal text-[15px] justify-center leading-4 mt-1 h-[34px] text-ellipsis overflow-hidden line-clamp-2">
                  {title}
                </h2>
                <div className="card-actions absolute bottom-[100%] left-0">
                  <div className="badge badge-outline bg-secondary text-[14px] border-none rounded-none rounded-r-md p-3">
                    Episode {latestEp}
                  </div>
                </div>
              </div>
              {/* Render GridAnimeHoverElement when hovered or always if gridIsHovered is true */}
              {/* {(hoveredId === mal_id || gridIsHovered) && (
                <GridAnimeHoverElement mal_id={mal_id} gridIsHovered={true} />
              )} */}
              {hoveredCardId === mal_id && (
                <GridAnimeHoverElement
                  mal_id={mal_id}
                  hoveredCard={hoveredCard}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GridSearchResults;

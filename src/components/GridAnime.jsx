import { useCallback, useState } from 'react';
import GridAnimeHoverElement from './GridAnimeHoverElement';

const GridAnime = ({ data }) => {
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

  return (
    <div className="grid grid-cols-2 gap-[15px] min-[460px]:grid-cols-3 min-[700px]:grid-cols-4 min-[800px]:grid-cols-5">
      {data.map((card) => {
        const image = card.entry?.images?.webp?.image_url;
        const title = card.entry.title;
        const mal_id = card.entry.mal_id;
        const latestEp = card.episodes[0];

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
            <div className="card-body p-2 justify-items-center relative">
              <h2 className="card-title font-normal text-[16px] justify-center leading-5 mt-1">
                {title}
              </h2>
              <div className="card-actions absolute bottom-[100%] left-0">
                <div className="badge badge-outline bg-secondary text-[14px] border-none rounded-none rounded-r-md p-3">
                  {latestEp.title}
                </div>
              </div>
            </div>

            {/* Render GridAnimeHoverElement only for the hovered card */}
            {hoveredCardId === mal_id && (
              <GridAnimeHoverElement
                mal_id={mal_id}
                title={title}
                hoveredCard={hoveredCard}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GridAnime;

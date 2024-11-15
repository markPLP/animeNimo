import { useCallback, useState } from 'react';
import GridAnimeHoverElement from './GridAnimeHoverElement';

const SidebarRecentlyAddedItem = ({ dataItem }) => {
  const { entry, episodes } = dataItem;
  const { title, mal_id } = entry;
  const image = entry?.images?.webp?.small_image_url;

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
    <article
      className="group hover:cursor-pointer flex p-5 gap-4 relative"
      onMouseEnter={() => handleMouseEnter(mal_id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-4">
        <figure className="w-[46px]">
          <img
            src={image}
            alt={title}
            className="w-full h-[60px] object-cover"
            loading="lazy"
          />
        </figure>
        <p className="group-hover:text-secondary flex-1">
          <span className="block leading-4 mb-2 text-[16px]">{title}</span>
          <span>
            {/* {episodes.map((ep) => {
            return 
          })} */}
            Episode {episodes[0].mal_id}
          </span>
        </p>
      </div>
      {hoveredCardId === mal_id && (
        <GridAnimeHoverElement mal_id={mal_id} hoveredCard={hoveredCard} />
      )}
    </article>
  );
};

export default SidebarRecentlyAddedItem;

import { formatNumber } from '../utils';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import GridAnimeHoverElement from './GridAnimeHoverElement';
import { useCallback, useState } from 'react';

const SidebarTopAnimeItem = ({ dataItem, index }) => {
  const { mal_id, title, scored_by, images } = dataItem;
  const image = images?.webp?.image_url;
  const imageLarge = images?.webp?.large_image_url;
  let number = index + 1;

  const listItemClasses = `group hover:cursor-pointer flex py-3 px-5 gap-4 relative ${
    index === 0
      ? 'h-[180px] place-items-end bg-cover col-span-2 lg:col-span-1'
      : 'items-center'
  }`;

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
      className={listItemClasses}
      style={index === 0 ? { backgroundImage: `url(${imageLarge})` } : {}}
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
            index === 0 ? 'bg-white border-white text-black relative z-10' : ''
          }`}
        >
          {number}
        </span>
      </div>
      <div className={`flex gap-4 ${index === 0 ? 'relative z-10' : ''}`}>
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
          <span className="block leading-4 mb-2 text-[16px]">{title}</span>
          <span>
            <AiOutlineUsergroupAdd className="text-[20px] inline" />
            {formatNumber(scored_by)}
          </span>
        </p>
      </div>
      {hoveredCardId === mal_id && (
        <GridAnimeHoverElement mal_id={mal_id} hoveredCard={hoveredCard} />
      )}
    </article>
  );
};

export default SidebarTopAnimeItem;

import { useEffect, useRef } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useFetchFullAnime } from '../hooks/useFetchFullAnime';

// eslint-disable-next-line react/prop-types
const GridAnimeHoverElement = ({ mal_id, hoveredCard, title }) => {
  const { isLoading, data, isError } = useFetchFullAnime(mal_id);
  const hoverRef = useRef(null);
  useEffect(() => {
    if (!hoveredCard) return;

    const adjustPosition = () => {
      if (hoverRef.current) {
        const contentRect = hoverRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Vertical adjustment
        if (contentRect.bottom > viewportHeight) {
          hoverRef.current.style.top = 'auto';
          hoverRef.current.style.bottom = '0'; // Align to the bottom if overflow
        } else {
          hoverRef.current.style.top = '50%';
          hoverRef.current.style.bottom = 'auto';
        }

        // Horizontal adjustment
        if (contentRect.right > viewportWidth) {
          hoverRef.current.style.left = '0%';
          hoverRef.current.style.right = '0'; // Align to the right if overflow
        } else if (contentRect.left < 0) {
          hoverRef.current.style.left = '100%'; // Align to the left if overflow
          hoverRef.current.style.right = 'auto';
        } else {
          hoverRef.current.style.left = '50%'; // Default alignment
          hoverRef.current.style.right = 'auto';
        }

        // Optional: Add transform to center when aligned
        hoverRef.current.style.transform = 'translate(-50%, -50%)';
      }
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);
    return () => window.removeEventListener('resize', adjustPosition);
  }, [hoveredCard]);

  // Handle loading and error states after hooks
  if (isLoading) {
    return (
      <div
        ref={hoverRef}
        className={`rounded-[11px] px-0 pb-0 z-10 w-[330px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-gray-800 text-white p-4 shadow-lg transition-opacity duration-200 flex place-items-center place-content-center`}
      >
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) return <div>Error fetching data...</div>;

  // Only render if data exists
  if (!data) return null;
  const { episodes, synopsis, title_english, type, score, status } = data;
  const { string, to } = data.aired;
  const genres = data.genres;

  return (
    <div
      ref={hoverRef}
      className={`rounded-[11px] px-0 pb-0 z-10 w-[330px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-gray-800 text-white p-4 shadow-lg transition-opacity duration-200 
          ${hoveredCard ? 'opacity-100' : 'opacity-0'} 
          hidden md:block`}
    >
      <h3 className="text-xl font-medium mb-3 px-5 ">{title_english}</h3>
      <div className="bg-gray-700 px-5 py-1 text-[15px] flex justify-between mb-3">
        <span>Episode {episodes}</span>
        <span className="bg-secondary px-2 rounded-md">Score {score}</span>
      </div>
      <p className="text-neutral-content text-[14px] leading-4 px-5 mb-3">
        {synopsis?.slice(0, 150)}...
      </p>
      <p className="text-neutral-content text-[14px] leading-2 px-5">
        Type: <span className="text-slate-300">{type}</span>
      </p>
      <p className="text-neutral-content text-[14px] leading-2 px-5">
        Date aired:{' '}
        <span className="text-slate-300">
          {string}
          {to === null && 'to ?'}
        </span>
      </p>
      <p className="text-neutral-content text-[14px] leading-2 px-5">
        Status: <span className="text-slate-300">{status}</span>
      </p>
      <p className="text-neutral-content text-[14px] leading-2 px-5">
        Genre:{' '}
        {genres.map((genre, index) => {
          return (
            <span key={index} className="text-secondary">
              {genre.name}
              {index < genres.length - 1 ? ', ' : ''}
            </span>
          );
        })}
      </p>
      <Link
        to={`/watch/${mal_id}/${title}`}
        className="rounded-b-[9px] flex items-center gap-2 bg-primary hover hover:bg-secondary w-full justify-center py-3 px-4 uppercase text-[20px] mt-3"
      >
        <BsFillPlayCircleFill />
        more details!
      </Link>
    </div>
  );
};

export default GridAnimeHoverElement;

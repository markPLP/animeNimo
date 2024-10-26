import { useState } from 'react';
import GridAnimeHoverElement from './GridAnimeHoverElement';
import { useLoaderData } from 'react-router-dom';
// import Loading from './Loading';
const GridAnime = ({ data }) => {
  // const { isLoading, data, isError } = custom_hook();

  const [hoveredId, setHoveredId] = useState(null); // State to track hovered card
  const [gridIsHovered, setGridIsHovered] = useState(false);

  const handleMouseEnter = (mal_id) => {
    setHoveredId(mal_id);
    setGridIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setGridIsHovered(false);
  };

  // isloading and isError will be handing on parallel request on landing component
  // if (isLoading) return <Loading />;
  // if (isError) return <div>There was an error...</div>;

  return (
    <>
      <div className="grid grid-cols-2 gap-[15px]  min-[460px]:grid-cols-3 min-[700px]:grid-cols-4  min-[800px]:grid-cols-5">
        {data.map((card) => {
          const image = card.entry?.images?.webp?.large_image_url;
          const { title, mal_id } = card.entry;
          const latestEp = card.episodes[0];
          // console.log('latestEp', latestEp);

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
              {/* Render GridAnimeHoverElement when hovered or always if gridIsHovered is true */}
              {/* {(hoveredId === mal_id || gridIsHovered) && (
                <GridAnimeHoverElement mal_id={mal_id} gridIsHovered={true} />
              )} */}
              {hoveredId === mal_id && (
                <GridAnimeHoverElement
                  mal_id={mal_id}
                  gridIsHovered={gridIsHovered}
                  setGridIsHovered={setGridIsHovered}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GridAnime;

import { Link } from 'react-router-dom';

const TypeHeadSuggestions = ({
  isLoading,
  suggestions,
  isError,
  showDropdown,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div
      className={`bg-neutral-900 rounded-lg absolute top-[100%] z-10 w-full custom-search-dropdown ${
        showDropdown ? 'custom-search-dropdown-show' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <div className="flex place-content-center h-36">
          <span className="loading loading-dots loading-lg bg-primary"></span>
        </div>
      )}
      {isError && (
        <div className="flex place-content-center h-36">
          <p>Error loading suggestions.</p>
        </div>
      )}
      {suggestions.map((item, index) => {
        const { title, mal_id, score, duration } = item;
        const image = item?.images?.webp?.small_image_url;
        const airedString = item.aired?.string;

        return (
          <Link
            to={`/watch/${mal_id}/${title}`}
            key={mal_id}
            className={`flex gap-3 items-center p-3 ${
              index % 2 !== 0 ? 'bg-gray-800' : ''
            } hover:bg-gray-900`}
          >
            <figure>
              <img
                src={image}
                alt={title}
                className="w-[40px] h-[50px] object-cover"
              />
            </figure>
            <div className="overflow-hidden">
              <h3 className="text-base overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[14px]">{airedString}</span>
                <i className="text-[0] w-1 h-1 bg-slate-50 rounded-md">dot</i>
                <span className="text-[14px]">Score: {score}</span>
                <i className="text-[0] w-1 h-1 bg-slate-50 rounded-md">dot</i>
                <span className="text-[14px]">{duration.slice(0, 3)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TypeHeadSuggestions;

import { AiFillCrown } from 'react-icons/ai';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SidebarRecentlyAddedItem = ({ dataItem }) => {
  // eslint-disable-next-line react/prop-types
  const { entry, episodes } = dataItem;
  const { title, mal_id } = entry;
  const image = entry?.images?.webp?.image_url;
  return (
    <article className="group hover:cursor-pointer gap-4 relative mx-[10px]">
      <Link
        className="bg-transparent absolute top-0 left-0 w-full h-full text-[0] z-10"
        to={`/watch/${mal_id}/${title}`}
      >
        to link
      </Link>
      <div>
        <figure className="relative overflow-hidden pt-[150%]">
          <img
            src={image}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>
        <p className="group-hover:text-secondary flex-1 mt-3">
          <span className="block card-title font-normal text-[18px] justify-center leading-5 mt-1">
            {title.slice(0, 15)}
          </span>
        </p>
        <p className="mt-2">
          {episodes.reverse().map((ep, index) => {
            const { mal_id } = ep;
            return (
              <span className="block leading-4 text-[14px]" key={index}>
                Episode {mal_id} <AiFillCrown className="inline bg-primary" />
              </span>
            );
          })}
        </p>
      </div>
    </article>
  );
};

export default SidebarRecentlyAddedItem;

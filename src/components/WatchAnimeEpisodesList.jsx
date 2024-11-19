import { useLoaderData } from 'react-router-dom';
import PaginationAnimeEpisodes from './PaginationAnimeEpisodes';
import { memo } from 'react';

// eslint-disable-next-line react/display-name
const WatchAnimeEpisodesList = memo(() => {
  const { pagination } = useLoaderData();
  console.log(pagination.last_visible_page, 'from useLoaderData');

  const newdata = {
    lastVisiblePage: pagination.last_visible_page,
    hasNextPage: pagination.has_next_page, // Dynamically use actual next page flag
  };
  console.log(newdata);

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <PaginationAnimeEpisodes
        lastVisiblePage={newdata.lastVisiblePage}
        hasNextPage={newdata.hasNextPage}
      />
    </div>
  );
});

export default WatchAnimeEpisodesList;

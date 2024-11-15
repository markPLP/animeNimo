import { memo } from 'react';
import SidebarRecentlyAddedItem from './SidebarRecentlyAddedItem';

const SidebarRecentlyAddedList = ({ data }) => {
  return (
    <div className="sm:grid grid-cols-2 lg:grid-cols-1">
      {data.slice(0, 10).map((item) => {
        return (
          <SidebarRecentlyAddedItem key={item.entry.mal_id} dataItem={item} />
        );
      })}
    </div>
  );
};

// Memoize the component to prevent re-renders if `data` does not change
export default memo(SidebarRecentlyAddedList);

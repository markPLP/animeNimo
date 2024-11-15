import { Link } from 'react-router-dom';
import { useFetchRecentlyAdded } from '../utils/reactQueryCustomHooks';
import Loading from './Loading';
import SidebarRecentlyAddedList from './SidebarRecentlyAddedList';

const SidebarRecentlyAdded = ({ headingTitle }) => {
  const { data, isLoading, isError } = useFetchRecentlyAdded();

  return (
    <>
      <div className="relative bg-base-300 rounded-lg mt-5">
        <div className="p-4 min-[470px]:flex items-center justify-between lg:flex-col gap-2 lg:items-start">
          <h3 className="text-xl pb-4 min-[470px]:pb-0">{headingTitle}</h3>
          <Link to="/recently-added">View All</Link>
        </div>
        <div className="min-h-[270px]">
          {isLoading && <Loading />}
          {isError && (
            <p>Error fetching data: {isError.message || 'Unknown error'}</p>
          )}
          {data && data.length > 0 ? (
            <SidebarRecentlyAddedList data={data} />
          ) : (
            !isLoading && <p>No top anime available for the selected filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarRecentlyAdded;

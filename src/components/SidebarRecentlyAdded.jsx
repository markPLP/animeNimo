import { Link } from 'react-router-dom';

import Loading from './Loading';
import SidebarRecentlyAddedList from './SidebarRecentlyAddedList';
import { useFetchRecentlyAdded } from '../hooks/useFetchRecentlyAdded';

const SidebarRecentlyAdded = ({ headingTitle, loaderData }) => {
  const { data: hookData, isLoading, isError } = useFetchRecentlyAdded();
  const data = loaderData || hookData;

  return (
    <>
      <div className="relative bg-base-300 rounded-lg mt-5">
        <div className="p-4 pb-6 min-[470px]:flex flex-row items-center justify-between">
          <h3 className="text-4xl pb-4 min-[470px]:pb-0">{headingTitle}</h3>
          <Link to="/recently-added" className="hover:text-secondary">
            View All
          </Link>
        </div>
        <div className="pb-11">
          {isLoading && <Loading />}
          {isError && (
            <p>Error fetching data: {isError.message || 'Unknown error'}</p>
          )}
          {data && data.length > 0 ? (
            <SidebarRecentlyAddedList data={data} />
          ) : (
            !isLoading && <p className="p-5">Loading data...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarRecentlyAdded;

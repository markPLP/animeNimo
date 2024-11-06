import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { current_page, last_visible_page } = pagination;
  // const {} =  pagination.items

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, 'uselocation');

  const handleChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    console.log(searchParams, 'pagination');
    searchParams.set('page', pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from(
    { length: last_visible_page },
    (_, index) => index + 1
  );

  if (pages < 2) return null;

  return (
    <div className="mt-9 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item bg-primary border-none"
          onClick={() => {
            let prevPage = current_page - 1;
            if (prevPage < 1) prevPage = last_visible_page; // bring to last array/item
            handleChange(prevPage);
          }}
        >
          prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`bg-primary btn btn-xs sm:btn-md border-none join-item ${
                current_page === pageNumber && 'bg-secondary'
              }`}
              onClick={() => handleChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item bg-primary border-none"
          onClick={() => {
            let nextPage = current_page + 1;
            if (nextPage > last_visible_page) nextPage = 1; // bring to the 1st item
            handleChange(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

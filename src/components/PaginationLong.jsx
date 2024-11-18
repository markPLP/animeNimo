import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationLong = () => {
  const { pagination } = useLoaderData(); // Assuming pagination comes from loader
  //const { current_page, last_visible_page } = pagination;
  const { current_page, last_visible_page, has_next_page } = pagination;

  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    // if (pageNumber < 1 || pageNumber > last_visible_page) return; // Ensure valid page range
    // navigate(`?page=${pageNumber}`);
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Previous Button
    pageButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(current_page - 1)}
        className={`btn btn-xs sm:btn-md join-item bg-primary border-none ${
          current_page === 1 ? 'btn-disabled' : 'btn-primary'
        }`}
        disabled={current_page === 1}
      >
        Prev
      </button>
    );

    // First page button
    if (current_page > 2) {
      pageButtons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="bg-primary btn btn-xs sm:btn-md border-none join-item"
        >
          1
        </button>
      );
    }

    // Ellipsis (dots)
    if (current_page > 3) {
      pageButtons.push(
        <button
          key="dots-1"
          className="bg-primary btn btn-xs sm:btn-md border-none join-item"
          disabled
        >
          ...
        </button>
      );
    }

    // Page buttons around the current page
    for (let i = current_page - 1; i <= current_page + 1; i++) {
      if (i > 0 && i <= last_visible_page) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`bg-primary btn btn-xs sm:btn-md border-none join-item ${
              i === current_page ? 'bg-secondary' : ''
            }`}
          >
            {i}
          </button>
        );
      }
    }

    // Ellipsis (dots)
    if (current_page < last_visible_page - 2) {
      pageButtons.push(
        <button
          key="dots-2"
          className="bg-primary btn btn-xs sm:btn-md border-none join-item text-neutral-50 text-sm"
          disabled
        >
          ...
        </button>
      );
    }

    // Last page button
    if (current_page < last_visible_page - 1) {
      pageButtons.push(
        <button
          key={last_visible_page}
          onClick={() => handlePageChange(last_visible_page)}
          className="bg-primary btn btn-xs sm:btn-md border-none join-item"
        >
          {last_visible_page}
        </button>
      );
    }

    // Next Button
    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(current_page + 1)}
        className={`btn btn-xs sm:btn-md join-item bg-primary border-none ${
          has_next_page ? 'btn-primary' : 'btn-disabled'
        }`}
        disabled={!has_next_page}
      >
        Next
      </button>
    );

    return pageButtons;
  };

  return (
    <div className="mt-8 flex justify-end">
      <div className="join">{renderPageButtons()}</div>
    </div>
  );
};

export default PaginationLong;

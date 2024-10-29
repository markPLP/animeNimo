import { Form, Link } from 'react-router-dom';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../features/search/TypeHeadSearchSlice';
import { setShowDropdown } from '../features/search/TypeHeadSearchSlice';
import { useGetTypeSearchData } from '../utils/reactQueryCustomHooks';
import { BsImage } from 'react-icons/bs';

const fallBackImage = <BsImage />;

const TypeHeadSearch = () => {
  const query = useSelector((state) => state.typeHeadSearch.query);
  const showDropdown = useSelector(
    (state) => state.typeHeadSearch.showDropdown
  );

  const { isLoading, suggestions, isError } = useGetTypeSearchData(query);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const newQuery = e.target.value;
    // console.log('Dispatching:', dispatch); // Log before dispatching
    dispatch(setQuery(newQuery));
    dispatch(setShowDropdown(true));
  };

  const handleMouseEnter = () => {
    dispatch(setShowDropdown(true));
    console.log('handlemouseEnter');
  };
  const handleMouseLeave = () => {
    dispatch(setShowDropdown(false));
    console.log('handleMouseLeave');
  };

  return (
    <div className="relative">
      <Form className="relative max-w-full w-full">
        <FormInput
          type="text"
          name="search"
          placeholder="Enter anime name1"
          extendClass="rounded-full appearance-none pr-14 max-w-full"
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute top-0 bottom-0 right-0 w-12 flex justify-center items-center"
        >
          <BsSearch className="text-xl font-bold" />
        </button>
      </Form>
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
          const image = item?.images?.webp?.small_image_url || fallBackImage;
          const { string } = item.aired;
          return (
            <Link
              to={`/watch/${mal_id}`}
              key={mal_id}
              className={`flex gap-3 items-center p-3 ${
                index % 2 !== 0 ? 'bg-gray-800' : ''
              } hover hover:bg-gray-900`}
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
                  <span className="text-[14px]">{string}</span>
                  <i className="text-[0] w-1 h-1 bg-slate-50 rounded-md">dot</i>
                  <span className="text-[14px]">Score{score}</span>
                  <i className="text-[0] w-1 h-1 bg-slate-50 rounded-md">dot</i>
                  <span className="text-[14px]">{duration.slice(0, 3)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TypeHeadSearch;

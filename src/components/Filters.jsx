import { Form, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AiOutlineReload } from 'react-icons/ai';
import FormSelect from './FormSelect';
import {
  filterAnimeType,
  filterAnimeStatus,
  filterAnimeOrderBy,
} from '../utils';

import 'react-calendar/dist/Calendar.css';
import FormCheckbox from './FormCheckbox';
import FormRange from './FormRange';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setSelectedGenres,
  // setSelectedYearStart,
  setType,
  setStatus,
  setOrderBy,
  setScore,
  setFilters,
  setFilterReset,
} from '../features/Filter/FilterSlice';
import { useGlobalContext } from '../context';

const Filters = ({ resetLink, allGenres }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allGenreData } = useGlobalContext();
  const {
    selectedGenres,
    selectedYearStart,
    searchQuery,
    type,
    status,
    orderBy,
    score,
  } = useSelector((state) => state.filtersState);

  const handleSelectionChange = (genres) => {
    dispatch(setSelectedGenres(genres));
  };

  const handleReset = () => {
    dispatch(setFilterReset());
  };

  // const startYearSelected = (date) => {
  //   dispatch(setSelectedYearStart(date));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const queryParams = new URLSearchParams();
    // Populate query parameters from form data
    formData.forEach((value, key) => {
      if (value) queryParams.append(key, value);
    });

    if (selectedGenres || selectedGenres.length)
      queryParams.set('genres', selectedGenres.join(','));
    if (selectedYearStart) queryParams.set('start_date', selectedYearStart);

    let queryParamsPayload = Object.fromEntries([
      ...new URLSearchParams(queryParams.toString()).entries(),
    ]);

    if (queryParamsPayload.genres) {
      queryParamsPayload.genres = queryParamsPayload.genres.split(',');
    }

    dispatch(setFilters({ filteredData: queryParamsPayload }));

    navigate(`/search-results?sfw=true&${queryParams.toString()}`);
  };

  return (
    <Form className="relative bg-base-300 rounded-lg" onSubmit={handleSubmit}>
      <h3 className="text-xl p-4 pb-0">Quick filter</h3>
      <div className="form-control grid grid-cols-2 gap-3 p-4">
        <FormInput
          type="search"
          placeholder="Search Anime..."
          name="search"
          size="min-h-10 h-10"
          parentClass="col-span-2"
          //  value={searchQuery}
          defaultValue={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        <FormSelect
          optionLabel="Type"
          name="type"
          list={filterAnimeType}
          size="min-h-10 h-10 capitalize"
          //value={type}
          defaultValue={type}
          onChange={(e) => dispatch(setType(e.target.value))}
        />
        <FormSelect
          optionLabel="Status"
          name="status"
          list={filterAnimeStatus}
          size="min-h-10 h-10 capitalize"
          defaultValue={status}
          //value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
        />
        <FormSelect
          optionLabel="Order by"
          name="order_by"
          list={filterAnimeOrderBy}
          size="min-h-10 h-10 capitalize"
          //value={orderBy}
          defaultValue={orderBy}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
        <FormCheckbox
          name="genres"
          options={allGenreData}
          excludeIds={[12, 49, 50]}
          onSelectionChange={handleSelectionChange}
          selectedOptions={selectedGenres}
          // defaultValue={selectedGenres}
        />
        {/* <YearPicker
          name="start_date"
          label="Start date"
          onYearSelected={startYearSelected}
          selectedYearStart={selectedYearStart}
        /> */}
        <FormRange
          label="The score must be between 1 and 9.99."
          size="h-5"
          name="score"
          parentClass="col-span-2"
          // defaultValue={score}
          score={score}
          onChange={(e) => dispatch(setScore(e.target.value))}
        />
      </div>
      <div className="form-control grid grid-cols-2 p-4 pt-0 gap-3">
        <button type="submit" className="btn btn-primary btn-sm min-h-12 mt-2">
          Search <BsSearch />
        </button>
        <Link
          to={resetLink}
          onClick={handleReset}
          className="btn btn-secondary btn-sm min-h-12 mt-2"
        >
          Reset
          <AiOutlineReload />
        </Link>
      </div>
    </Form>
  );
};

export default Filters;

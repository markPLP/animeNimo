import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import FormSelect from './FormSelect';
import {
  filterAnimeType,
  filterAnimeStatus,
  filterAnimeOrderBy,
} from '../utils';

import 'react-calendar/dist/Calendar.css';
import YearPicker from './YearPicker';
import FormCheckbox from './FormCheckbox';
import FormRange from './FormRange';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

const Filters = () => {
  const { allGenres } = useLoaderData();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const handleSelectionChange = (genres) => {
    setSelectedGenres(genres); // Update selected genres from FormCheckbox
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const queryParams = new URLSearchParams();
  //   console.log(selectedGenres);

  //   // Add selected genres to URL params
  //   if (selectedGenres.length > 0) {
  //     const appendParams = queryParams.append(
  //       'genres',
  //       selectedGenres.join(',')
  //     );
  //     console.log(appendParams);
  //   }

  //   // Navigate to the new URL with updated params
  //   navigate(`?${queryParams.toString()}`);
  // };

  return (
    <Form className="relative bg-base-300 rounded-lg">
      <h3 className="text-3xl p-4 pb-0">Quick filter</h3>
      <div className="form-control grid grid-cols-2 gap-2  p-4">
        <FormSelect
          optionLabel="Type"
          name="type"
          list={filterAnimeType}
          size="min-h-10 h-10 capitalize"
        />
        <FormSelect
          optionLabel="Status"
          name="status"
          list={filterAnimeStatus}
          size="min-h-10 h-10 capitalize"
        />
        <FormSelect
          optionLabel="Order by"
          name="order_by"
          list={filterAnimeOrderBy}
          size="min-h-10 h-10 capitalize"
        />
        {/* <FormSelect
          optionLabel="Rating"
          name="rating"
          list={filterRating}
          size="min-h-10 h-10 capitalize"
        /> */}
        <FormCheckbox
          name="genres"
          options={allGenres}
          excludeIds={[12, 49, 50]}
          onSelectionChange={handleSelectionChange}
        />
        <YearPicker name="start_date" label="Start date" />
        <YearPicker name="end_date" label="End date" />
        <FormRange
          label="The score must be between 1 and 9.99."
          size="h-5 capitalize"
          name="score"
          parentClass="col-span-2"
        />
        <FormInput
          type="search"
          placeholder="Search Anime..."
          // IMPORTANT name should match whats on the backend
          name="search"
          size="min-h-10 h-10"
          parentClass="col-span-2"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-sm col-span-2 w-full min-h-12 rounded-t-none"
      >
        search <BsSearch />
      </button>
    </Form>
  );
};

export default Filters;

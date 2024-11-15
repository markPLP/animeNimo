import { Form, useNavigation, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import { BsSearch } from 'react-icons/bs';
import { useGetTypeSearchData } from '../utils/reactQueryCustomHooks';

import TypeHeadSuggestions from './TypeHeadSuggestions';
import { useCallback, useState } from 'react';

const TypeHeadSearch = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { isLoading, suggestions, isError } = useGetTypeSearchData(query);

  const handleChange = useCallback((e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowDropdown(true);
  }, []);

  const handleMouseEnter = useCallback(() => setShowDropdown(true), []);

  const handleMouseLeave = useCallback(() => setShowDropdown(false), []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/search-results/?q=${encodeURIComponent(query)}`);
    },
    [navigate, query]
  );

  return (
    <div className="relative">
      <Form className="relative max-w-full w-full" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="search"
          placeholder="Enter anime name"
          extendClass="rounded-full appearance-none pr-14 max-w-full"
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute top-0 bottom-0 right-0 w-12 flex justify-center items-center"
          disabled={isSubmitting}
        >
          <BsSearch className="text-xl font-bold" />
        </button>
      </Form>
      {showDropdown && (
        <TypeHeadSuggestions
          isLoading={isLoading}
          suggestions={suggestions}
          isError={isError}
          showDropdown={showDropdown}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};
export default TypeHeadSearch;

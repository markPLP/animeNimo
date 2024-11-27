import { useState } from 'react';

const FormCheckbox = ({
  name,
  options,
  excludeIds = [],
  onSelectionChange,
  selectedOptions = [], // Expected to come from Redux and update on change
}) => {
  const [showGenres, setShowGenres] = useState(false);
  const [selectedValues, setSelectedValues] = useState(selectedOptions);

  const handleCheckboxChange = (mal_id) => {
    const newSelectedOptions = selectedOptions.includes(mal_id)
      ? selectedOptions.filter((item) => item !== mal_id)
      : [...selectedOptions, mal_id];

    setSelectedValues(newSelectedOptions);
    onSelectionChange(newSelectedOptions); // update the parent/pass data
  };

  const filteredOptions = options
    ? options.filter((option) => !excludeIds.includes(option.mal_id))
    : [];

  return (
    <div>
      <div
        className="select select-bordered min-h-10 h-10 capitalize flex items-center"
        onClick={() => setShowGenres(!showGenres)}
      >
        Genre
      </div>
      <div
        className={`p-4 grid grid-cols-2 gap-2 absolute top-0 left-0 bg-neutral w-full z-10 ${
          showGenres === false && 'hidden'
        }`}
        onMouseLeave={() => setShowGenres(false)}
      >
        <button
          className="absolute right-[10px] top-[10px] lg:hidden"
          onClick={() => setShowGenres(false)}
        >
          x
        </button>
        {filteredOptions.map((option) => {
          const { mal_id, name } = option;
          const selectedOptionAsNumbers = selectedOptions.map(Number);
          const isContained = selectedOptionAsNumbers.includes(mal_id);

          return (
            <label
              key={mal_id}
              className="flex items-center space-x-2 text-[15px] break-all"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                value={mal_id}
                checked={isContained}
                onChange={() => handleCheckboxChange(mal_id)}
                name={name}
              />
              <span>{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FormCheckbox;

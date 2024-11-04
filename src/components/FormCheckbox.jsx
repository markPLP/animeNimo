import { useState } from 'react';

const FormCheckbox = ({
  name,
  options,
  excludeIds = [],
  onSelectionChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showGenres, setShowGenres] = useState(false);

  const handleCheckboxChange = (mal_id) => {
    const newSelectedOptions = selectedOptions.includes(mal_id)
      ? selectedOptions.filter((item) => item !== mal_id) // Unselect if already selected
      : [...selectedOptions, mal_id]; // Add to selection if not selected

    setSelectedOptions(newSelectedOptions);
    onSelectionChange(newSelectedOptions); // Notify parent of selection change
  };

  // Filter out options with excluded mal_id values
  const filteredOptions = options.filter(
    (option) => !excludeIds.includes(option.mal_id)
  );
  return (
    <div>
      <div
        className="select select-bordered min-h-10 h-10 capitalize flex items-center"
        onClick={() => setShowGenres(!showGenres)} // Toggle dropdown on header click
      >
        Genre
      </div>
      {showGenres && (
        <div
          className="p-4 grid grid-cols-2 gap-2 absolute top-0 left-0 bg-neutral w-full z-10"
          onMouseLeave={() => setShowGenres(false)} // Close when mouse leaves the whole dropdown
        >
          <button
            className="absolute right-[10px] top-[10px] lg:hidden"
            onClick={() => setShowGenres(false)}
          >
            x
          </button>
          {filteredOptions.map((option) => {
            const { mal_id, name } = option;
            return (
              <label
                key={mal_id}
                className="flex items-center space-x-2 text-[15px] break-all"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  value={mal_id}
                  checked={selectedOptions.includes(mal_id)}
                  onChange={() => handleCheckboxChange(mal_id)}
                  name={name}
                />
                <span>{name}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormCheckbox;

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const AtoZbuttons = () => {
  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState(''); // Tracks the active filter letter

  const handleFilter = useCallback(
    (letter) => {
      setSelectedLetter(letter);
      navigate(`/az-list?letter=${letter}`);
    },
    [navigate]
  );

  // eslint-disable-next-line react/display-name, react/prop-types
  const Button = memo(({ letter, isActive }) => {
    return (
      <button
        onClick={() => handleFilter(letter)}
        className={`p-3 rounded-md leading-3 font-bold uppercase bg-primary text-slate-50 ${
          isActive
            ? 'bg-secondary'
            : 'bg-gray-200 text-gray-800 hover:bg-secondary'
        }`}
      >
        {letter}
      </button>
    );
  });

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {['all', ...Array.from('abcdefghijklmnopqrstuvwxyz')].map((letter) => (
        <Button
          key={letter}
          letter={letter}
          isActive={selectedLetter === letter}
        />
      ))}
    </div>
  );
};

export default AtoZbuttons;

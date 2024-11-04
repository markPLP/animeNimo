import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/CalendarStyles.css';

const YearPicker = ({ name, label }) => {
  //const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYear, setSelectedYear] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const startYear = new Date(2001, 0, 1); // January 1, 2001
  const endYear = new Date(); // Current year

  const handleYearClick = (value) => {
    const year = value.getFullYear();
    setSelectedYear(year);
    setShowCalendar(false);
  };

  return (
    <div onMouseLeave={() => setShowCalendar(false)}>
      <div
        className="select select-bordered min-h-10 h-10 capitalize flex items-center"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {selectedYear || label}
      </div>
      {showCalendar && (
        <Calendar
          value={new Date(selectedYear, 0, 1)} // Display selected year
          view="decade" // Shows years within a decade view
          minDate={startYear} // Minimum date
          maxDate={endYear} // Maximum date
          onClickYear={handleYearClick} // Handle year selection
          className="absolute left-0 z-10 w-full"
          onMouseLeave={() => setShowCalendar(false)}
          name={name}
        />
      )}
    </div>
  );
};

export default YearPicker;

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/CalendarStyles.css';
import { format } from 'date-fns';

const YearPicker = ({ name, label, onYearSelected, selectedYearStart }) => {
  const [selectedDate, setSelectedDate] = useState(selectedYearStart);
  const [showCalendar, setShowCalendar] = useState(false);

  const startYear = new Date(2001, 0, 1); // January 1, 2001
  const endYear = new Date(); // Current year

  const handleYearClick = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
    setShowCalendar(false);
    onYearSelected(formattedDate); // pass value to parent as prop
  };

  return (
    <div className="col-span-2">
      <div
        className="select select-bordered min-h-10 h-10 capitalize flex items-center"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {selectedDate ? selectedDate : label}
      </div>
      {showCalendar && (
        <Calendar
          //value={selectedDate} // Display selected year
          //view="decade" // Shows years within a decade view
          minDate={startYear} // Minimum date
          maxDate={endYear} // Maximum date
          onClickYear={handleYearClick} // Handle year selection
          className="absolute left-0 z-10 w-full"
          onMouseLeave={() => setShowCalendar(false)}
          //defaultValue={selectedDate}
          name={name}
        />
      )}
    </div>
  );
};

export default YearPicker;

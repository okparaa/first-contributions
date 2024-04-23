import React, { useState } from 'react';
import Calendar from './Calendar'; // Import your calendar component

interface Props {
  onSelectDate: (date: Date) => void;
}

const DatePicker: React.FC<Props> = ({ onSelectDate }) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayedMonth, setDisplayedMonth] = useState<number>(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState<number>(new Date().getFullYear());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    onSelectDate(date);
  };

  const handlePrevMonth = () => {
    const newMonth = displayedMonth === 0 ? 11 : displayedMonth - 1;
    const newYear = displayedMonth === 0 ? displayedYear - 1 : displayedYear;
    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = displayedMonth === 11 ? 0 : displayedMonth + 1;
    const newYear = displayedMonth === 11 ? displayedYear + 1 : displayedYear;
    setDisplayedMonth(newMonth);
    setDisplayedYear(newYear);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button className="mr-2" onClick={handlePrevMonth}>&lt;</button>
        <input
          type="text" // Use text type to show the selected date
          readOnly // Make the input read-only
          className="appearance-none block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          onClick={() => setShowCalendar(true)} // Show calendar when input is clicked
        />
        <button className="ml-2" onClick={handleNextMonth}>&gt;</button>
      </div>
      {showCalendar && (
        <div className="absolute top-full left-0 z-10">
          <Calendar onSelectDate={handleDateChange} displayedMonth={displayedMonth} displayedYear={displayedYear} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;




import React, { useState } from 'react';

interface Props {
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<Props> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleMonthClick = (month: number) => {
    setCurrentMonth(month);
  };

  const handleYearClick = (year: number) => {
    setCurrentYear(year);
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, index) => {
      const year = currentYear - 6 + index;
      return (
        <div key={year} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleYearClick(year)}>
          {year}
        </div>
      );
    });

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="grid grid-cols-4 gap-2">
          {years}
        </div>
      </div>
    );
  };

  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(new Date().getFullYear(), index, 1);
      return (
        <div key={index} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleMonthClick(index)}>
          {monthDate.toLocaleString('default', { month: 'long' })}
        </div>
      );
    });

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="grid grid-cols-3 gap-2">
          {months}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const currentDate = new Date();
    const year = currentMonth !== null ? currentYear! : currentDate.getFullYear();
    const month = currentMonth !== null ? currentMonth! : currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="flex justify-between mb-4">
          <button onClick={() => setCurrentMonth(null)}>&lt; Back to Months</button>
          <h2>{currentMonth !== null ? `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}` : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => handleMonthClick(month + 1)}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
          {[...Array(firstDayOfMonth).keys()].map((index) => (
            <div key={index}></div>
          ))}
          {days.map((day) => (
            <div key={day} className="text-center cursor-pointer" onClick={() => handleDateClick(new Date(year, month, day))}>{day}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentYear !== null ? renderMonthPicker() : currentMonth !== null ? renderCalendar() : renderYearPicker()}
    </div>
  );
};

export default Calendar;


import React, { useState } from 'react';
import Calendar from './Calendar'; // Import your calendar component

const DatePicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <input
        type="text" // Use text type to show the selected date
        readOnly // Make the input read-only
        className="appearance-none block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        onClick={() => setShowCalendar(true)} // Show calendar when input is clicked
      />
      {showCalendar && (
        <div className="absolute top-full left-0 z-10">
          <Calendar onSelectDate={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;



import React, { useState } from 'react';

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleMonthClick = (month) => {
    setCurrentMonth(month);
  };

  const handleYearClick = (year) => {
    setCurrentYear(year);
  };

  const renderYearPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, index) => {
      const year = currentYear - 6 + index;
      return (
        <div key={year} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleYearClick(year)}>
          {year}
        </div>
      );
    });

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="grid grid-cols-4 gap-2">
          {years}
        </div>
      </div>
    );
  };

  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(new Date().getFullYear(), index, 1);
      return (
        <div key={index} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleMonthClick(index)}>
          {monthDate.toLocaleString('default', { month: 'long' })}
        </div>
      );
    });

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="grid grid-cols-3 gap-2">
          {months}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const currentDate = new Date();
    const year = currentMonth !== null ? currentYear : currentDate.getFullYear();
    const month = currentMonth !== null ? currentMonth : currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="p-4 bg-white shadow rounded">
        <div className="flex justify-between mb-4">
          <button onClick={() => setCurrentMonth(null)}>&lt; Back to Months</button>
          <h2>{currentMonth !== null ? `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}` : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => handleMonthClick(month + 1)}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
          {[...Array(firstDayOfMonth).keys()].map((index) => (
            <div key={index}></div>
          ))}
          {days.map((day) => (
            <div key={day} className="text-center cursor-pointer" onClick={() => handleDateClick(new Date(year, month, day))}>{day}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentYear !== null ? renderMonthPicker() : currentMonth !== null ? renderCalendar() : renderYearPicker()}
    </div>
  );
};

export default Calendar;

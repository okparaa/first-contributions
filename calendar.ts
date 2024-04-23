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

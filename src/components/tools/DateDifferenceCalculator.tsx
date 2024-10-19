import React, { useState } from 'react';
import moment from 'moment';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      alert('Please enter both start and end dates');
      return;
    }

    const start = moment(startDate);
    const end = moment(endDate);

    if (end.isBefore(start)) {
      alert('End date must be after start date');
      return;
    }

    const years = end.diff(start, 'years');
    start.add(years, 'years');

    const months = end.diff(start, 'months');
    start.add(months, 'months');

    const days = end.diff(start, 'days');

    setDifference({ years, months, days });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Date Difference Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateDifference}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Difference
      </button>
      {difference && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Date Difference:</h2>
          <p className="text-lg">
            {difference.years} years, {difference.months} months, and {difference.days} days
          </p>
        </div>
      )}
    </div>
  );
};

export default DateDifferenceCalculator;
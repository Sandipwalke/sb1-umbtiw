import React, { useState } from 'react';
import moment from 'moment';

const DateFormatter: React.FC = () => {
  const [inputDate, setInputDate] = useState('');
  const [formatString, setFormatString] = useState('YYYY-MM-DD HH:mm:ss');
  const [formattedDate, setFormattedDate] = useState('');

  const formatDate = () => {
    if (!inputDate) {
      alert('Please enter a date');
      return;
    }

    try {
      const formatted = moment(inputDate).format(formatString);
      setFormattedDate(formatted);
    } catch (error) {
      alert('Invalid date or format string');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Date Formatter</h1>
      <div className="mb-4">
        <label className="block mb-2">Input Date:</label>
        <input
          type="datetime-local"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Format String:</label>
        <input
          type="text"
          value={formatString}
          onChange={(e) => setFormatString(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={formatDate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Format Date
      </button>
      {formattedDate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Formatted Date:</h2>
          <p className="text-lg font-mono">{formattedDate}</p>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Format String Examples:</h3>
        <ul className="list-disc pl-5">
          <li>YYYY-MM-DD HH:mm:ss</li>
          <li>DD/MM/YYYY</li>
          <li>MMMM Do YYYY, h:mm:ss a</li>
          <li>dddd, MMMM Do YYYY</li>
        </ul>
      </div>
    </div>
  );
};

export default DateFormatter;
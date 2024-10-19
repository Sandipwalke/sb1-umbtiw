import React, { useState } from 'react';
import moment from 'moment';

const UnixTimestampConverter: React.FC = () => {
  const [unixTimestamp, setUnixTimestamp] = useState('');
  const [humanReadableDate, setHumanReadableDate] = useState('');
  const [conversionDirection, setConversionDirection] = useState<'toDate' | 'toUnix'>('toDate');

  const convertTimestamp = () => {
    if (conversionDirection === 'toDate') {
      if (!unixTimestamp) {
        alert('Please enter a Unix timestamp');
        return;
      }
      const date = moment.unix(Number(unixTimestamp));
      setHumanReadableDate(date.format('YYYY-MM-DD HH:mm:ss'));
    } else {
      if (!humanReadableDate) {
        alert('Please enter a date');
        return;
      }
      const unix = moment(humanReadableDate).unix();
      setUnixTimestamp(unix.toString());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unix Timestamp Converter</h1>
      <div className="mb-4">
        <label className="block mb-2">Conversion Direction:</label>
        <select
          value={conversionDirection}
          onChange={(e) => setConversionDirection(e.target.value as 'toDate' | 'toUnix')}
          className="w-full p-2 border rounded"
        >
          <option value="toDate">Unix Timestamp to Date</option>
          <option value="toUnix">Date to Unix Timestamp</option>
        </select>
      </div>
      {conversionDirection === 'toDate' ? (
        <div className="mb-4">
          <label className="block mb-2">Unix Timestamp:</label>
          <input
            type="number"
            value={unixTimestamp}
            onChange={(e) => setUnixTimestamp(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block mb-2">Human-readable Date:</label>
          <input
            type="datetime-local"
            value={humanReadableDate}
            onChange={(e) => setHumanReadableDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <button
        onClick={convertTimestamp}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Convert
      </button>
      {conversionDirection === 'toDate' && humanReadableDate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Human-readable Date:</h2>
          <p className="text-lg font-mono">{humanReadableDate}</p>
        </div>
      )}
      {conversionDirection === 'toUnix' && unixTimestamp && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Unix Timestamp:</h2>
          <p className="text-lg font-mono">{unixTimestamp}</p>
        </div>
      )}
    </div>
  );
};

export default UnixTimestampConverter;
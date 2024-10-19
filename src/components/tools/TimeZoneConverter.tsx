import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeZoneConverter = () => {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('UTC');
  const [convertedTime, setConvertedTime] = useState('');
  const [timeZones, setTimeZones] = useState<string[]>([]);

  useEffect(() => {
    setTimeZones(moment.tz.names());
  }, []);

  const convertTime = () => {
    if (!sourceTime) {
      alert('Please enter a valid source time');
      return;
    }
    const converted = moment.tz(sourceTime, sourceZone).tz(targetZone).format('YYYY-MM-DD HH:mm:ss');
    setConvertedTime(converted);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Time Zone Converter</h2>
      <div className="mb-4">
        <label className="block mb-2">Source Time:</label>
        <input
          type="datetime-local"
          value={sourceTime}
          onChange={(e) => setSourceTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Source Time Zone:</label>
        <select
          value={sourceZone}
          onChange={(e) => setSourceZone(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Target Time Zone:</label>
        <select
          value={targetZone}
          onChange={(e) => setTargetZone(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={convertTime}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Convert
      </button>
      {convertedTime && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Converted Time:</h3>
          <p className="text-lg">{convertedTime}</p>
        </div>
      )}
    </div>
  );
};

export default TimeZoneConverter;
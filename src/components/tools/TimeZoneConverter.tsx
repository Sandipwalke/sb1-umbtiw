import React, { useState } from 'react';
import moment from 'moment-timezone';

const TimeZoneConverter = () => {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('UTC');
  const [convertedTime, setConvertedTime] = useState('');

  const convertTime = () => {
    const converted = moment.tz(sourceTime, sourceZone).tz(targetZone).format('YYYY-MM-DD HH:mm:ss');
    setConvertedTime(converted);
  };

  return (
    <div>
      <h2>Time Zone Converter</h2>
      {/* Add input fields for sourceTime, sourceZone, targetZone */}
      <button onClick={convertTime}>Convert</button>
      <p>Converted Time: {convertedTime}</p>
    </div>
  );
};

export default TimeZoneConverter;
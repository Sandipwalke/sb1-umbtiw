import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const WorldClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<{ [key: string]: string }>({});
  const timeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  useEffect(() => {
    const updateTime = () => {
      const times: { [key: string]: string } = {};
      timeZones.forEach((zone) => {
        times[zone] = moment().tz(zone).format('YYYY-MM-DD HH:mm:ss');
      });
      setCurrentTime(times);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">World Clock</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeZones.map((zone) => (
          <div key={zone} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{zone}</h2>
            <p className="text-xl font-mono">{currentTime[zone]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
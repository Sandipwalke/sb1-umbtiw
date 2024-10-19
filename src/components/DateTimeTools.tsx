import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { toolCategories } from '../data/toolData';
import TimeZoneConverter from './tools/TimeZoneConverter';
import AgeCalculator from './tools/AgeCalculator';
import DateDifferenceCalculator from './tools/DateDifferenceCalculator';
import CountdownTimer from './tools/CountdownTimer';
import Stopwatch from './tools/Stopwatch';
import WorldClock from './tools/WorldClock';
import DateFormatter from './tools/DateFormatter';
import UnixTimestampConverter from './tools/UnixTimestampConverter';
import MoonPhaseCalculator from './tools/MoonPhaseCalculator';

const DateTimeTools: React.FC = () => {
  const category = toolCategories.find(cat => cat.name === "Date & Time Tools");
  const location = useLocation();

  const renderTool = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'time-zone-converter':
        return <TimeZoneConverter />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'date-difference-calculator':
        return <DateDifferenceCalculator />;
      case 'countdown-timer':
        return <CountdownTimer />;
      case 'stopwatch':
        return <Stopwatch />;
      case 'world-clock':
        return <WorldClock />;
      case 'date-formatter':
        return <DateFormatter />;
      case 'unix-timestamp-converter':
        return <UnixTimestampConverter />;
      case 'moon-phase-calculator':
        return <MoonPhaseCalculator />;
      default:
        return <div className="text-center text-gray-500 mt-8">Select a tool from the list to get started</div>;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Date & Time Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
          <ul className="space-y-2">
            {category?.tools.map(tool => (
              <li key={tool.id}>
                <a
                  href={`/date-time-tools/${tool.name.toLowerCase().replace(/ /g, '-')}`}
                  className={`block p-2 rounded ${
                    location.pathname.includes(tool.name.toLowerCase().replace(/ /g, '-'))
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {tool.name}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
        <div className="md:col-span-3">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default DateTimeTools;
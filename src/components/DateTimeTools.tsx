import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Date & Time Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-2">Select a Tool</h3>
          <ul className="space-y-2">
            {category?.tools.map(tool => (
              <li key={tool.id}>
                <Link
                  to={`/date-time-tools/${tool.name.toLowerCase().replace(/ /g, '-')}`}
                  className={`block p-2 rounded ${
                    location.pathname.includes(tool.name.toLowerCase().replace(/ /g, '-'))
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <Routes>
            <Route path="time-zone-converter" element={<TimeZoneConverter />} />
            <Route path="age-calculator" element={<AgeCalculator />} />
            <Route path="date-difference-calculator" element={<DateDifferenceCalculator />} />
            <Route path="countdown-timer" element={<CountdownTimer />} />
            <Route path="stopwatch" element={<Stopwatch />} />
            <Route path="world-clock" element={<WorldClock />} />
            <Route path="date-formatter" element={<DateFormatter />} />
            <Route path="unix-timestamp-converter" element={<UnixTimestampConverter />} />
            <Route path="moon-phase-calculator" element={<MoonPhaseCalculator />} />
            <Route
              index
              element={<div className="text-center text-gray-500 mt-8">Select a tool from the list to get started</div>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DateTimeTools;
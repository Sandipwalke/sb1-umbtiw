import React, { useState } from 'react';
import moment from 'moment';

const MoonPhaseCalculator: React.FC = () => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [moonPhase, setMoonPhase] = useState('');

  const calculateMoonPhase = () => {
    const inputDate = moment(date);
    const year = inputDate.year();
    const month = inputDate.month() + 1;
    const day = inputDate.date();

    const c = Math.floor((year - 1900) / 100);
    const y = year - 1900 - c * 100;
    const j = Math.floor(c / 4);
    const k = Math.floor(y / 4);
    const m = Math.floor((month + 1) / 2);

    let t = 2.415 * ((year - 1980) / 100);
    t -= 0.304 * ((year - 1980) / 100) * ((year - 1980) / 100);

    let x = 29.5305888531 + 102.19 * y + 0.000012342 * y * y + 166.56 - 0.4721 * c + (day + 31 * (month - 1) - j + k + m);

    x = x - 122.1 - t;
    x = x / 29.53;
    x = x - Math.floor(x);

    if (x < 0) x += 1;
    x = x * 29.53;

    let phase = '';
    if (x < 1.84566) phase = 'New Moon';
    else if (x < 5.53699) phase = 'Waxing Crescent';
    else if (x < 9.22831) phase = 'First Quarter';
    else if (x < 12.91963) phase = 'Waxing Gibbous';
    else if (x < 16.61096) phase = 'Full Moon';
    else if (x < 20.30228) phase = 'Waning Gibbous';
    else if (x < 23.99361) phase = 'Last Quarter';
    else if (x < 27.68493) phase = 'Waning Crescent';
    else phase = 'New Moon';

    setMoonPhase(phase);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Moon Phase Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateMoonPhase}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate Moon Phase
      </button>
      {moonPhase && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Moon Phase:</h2>
          <p className="text-lg">{moonPhase}</p>
        </div>
      )}
    </div>
  );
};

export default MoonPhaseCalculator;
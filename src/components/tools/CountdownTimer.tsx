import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer: React.FC = () => {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const intervalId = setInterval(() => {
      const now = moment();
      const target = moment(targetDate);
      const duration = moment.duration(target.diff(now));

      if (duration.asSeconds() <= 0) {
        clearInterval(intervalId);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const handleSetTimer = () => {
    if (!targetDate) {
      alert('Please set a target date and time');
      return;
    }

    if (moment(targetDate).isBefore(moment())) {
      alert('Target date must be in the future');
      return;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>
      <div className="mb-4">
        <label className="block mb-2">Target Date and Time:</label>
        <input
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSetTimer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Countdown
      </button>
      {timeLeft && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Time Remaining:</h2>
          <p className="text-lg">
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
          </p>
        </div>
      )}
      {timeLeft === null && targetDate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Countdown Finished!</h2>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;